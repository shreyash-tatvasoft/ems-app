'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { API_ROUTES, BALANCED_COLORS } from '@/utils/constant';
import { apiCall } from '@/utils/services/request';

ChartJS.register(ArcElement, Tooltip, Legend);

interface IData {
    "_id": string,
    "totalBookings": number,
    "seatsAvailable": number,
    "bookingPercentage": number,
    "ticketType": string,
    "totalSeats": number
}

const DoughnutChart: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [labels, setLabels] = useState<string[]>([]);
    const [data, setData] = useState<number[]>([]);

    // Memoize the fetchData function to avoid recreation on each render
    const fetchData = useCallback(async () => {
        try {
            const response = await apiCall({
                endPoint: API_ROUTES.ADMIN.BOOKING_BY_TICKET_TYPE,
                method: "GET",
            });

            const bookingMap = (response.data as IData[]).reduce((acc, item) => {
                acc[item.ticketType] = (acc[item.ticketType] || 0) + item.totalBookings;
                return acc;
            }, {} as Record<string, number>);

            const dynamicLabels = Object.keys(bookingMap);
            const dynamicData = Object.values(bookingMap);

            setLabels(dynamicLabels);
            setData(dynamicData);
        } catch (error) {
            console.error('Error fetching doughnut chart data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Call fetchData only once when the component mounts
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Memoize chart data to prevent unnecessary recalculations
    const chartData = useMemo(() => ({
        labels,
        datasets: [
            {
                label: 'Data',
                data,
                backgroundColor: BALANCED_COLORS.slice(0, labels.length),
                borderWidth: 1,
            },
        ],
    }), [labels, data]);

    // Memoize chart options to prevent recalculations
    const options = useMemo(() => ({
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
                        const bookingText = value === '1' ? 'Booking' : 'Bookings';
                        return `${label}: ${value} ${bookingText}`;
                    },
                },
            },
        },
    }), []);

    // Show skeleton loader while data is loading
    if (loading) {
        return (
            <div className="w-full flex justify-center items-center">
                <Skeleton className="h-70 w-70 rounded-full" />
            </div>
        );
    }

    return (
        <div className='min-h-[250px] h-[350px] md:h-[300px] w-full flex items-center justify-center'>
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

export default DoughnutChart;
