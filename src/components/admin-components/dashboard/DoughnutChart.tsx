'use client';

import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { BALANCED_COLORS } from '@/utils/constant';
// import { apiCall } from '@/utils/services/request';

ChartJS.register(ArcElement, Tooltip, Legend);

const mockResp = {
    "status": 200,
    "data": [
        {
            "_id": "6805d07cb0efa18db895ca04",
            "totalBookings": 10,
            "seatsAvailable": 40,
            "bookingPercentage": 20,
            "ticketType": "Free",
            "totalSeats": 50
        },
        {
            "_id": "6805d07cb0efa18db895ca03",
            "totalBookings": 3,
            "seatsAvailable": 47,
            "bookingPercentage": 6,
            "ticketType": "Standard",
            "totalSeats": 50
        },
        {
            "_id": "67fe3a46bc0b4c7a774585b9",
            "totalBookings": 2,
            "seatsAvailable": 98,
            "bookingPercentage": 2,
            "ticketType": "Premium",
            "totalSeats": 100
        },
        {
            "_id": "67fe399ebc0b4c7a77458586",
            "totalBookings": 2,
            "seatsAvailable": 48,
            "bookingPercentage": 4,
            "ticketType": "Standard",
            "totalSeats": 50
        }
    ],
    "success": true,
    "message": "OK"
}

const DoughnutChart: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [labels, setLabels] = useState<string[]>([]);
    const [data, setData] = useState<number[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                // const response = await apiCall({
                //     endPoint: API_ROUTES.ADMIN.BOOKING_BY_TICKET_TYPE,
                //     method: "GET",
                // });

                // console.log("response", response)

                const bookingMap = mockResp.data.reduce((acc, item) => {
                    acc[item.ticketType] = (acc[item.ticketType] || 0) + item.totalBookings;
                    return acc;
                }, {} as Record<string, number>);

                const dynamicLabels = Object.keys(bookingMap);
                const dynamicData = Object.values(bookingMap);




                setLabels(dynamicLabels);
                setData(dynamicData);
            } catch (error) {
                console.error('Error fetching pie chart data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Data',
                data,
                backgroundColor: BALANCED_COLORS.slice(0, labels.length),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: '60%',
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            tooltip: {
                callbacks: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    label: function (context: any) {
                        const label = context.label || '';
                        const value = context.formattedValue || 0;
                        const likesText = value === '1' ? 'Booking' : 'Bookings';
                        return `${label}: ${value} ${likesText}`;
                    },
                },
            },
        },
    };

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center">
                <Skeleton className="h-70 w-70 rounded-full" />
            </div>
        );
    }

    return (
        <div className="max-h-[350px] w-full flex justify-center">
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default DoughnutChart;
