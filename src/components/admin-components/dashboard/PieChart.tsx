'use client';

import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';

import { LIGHT_COLORS } from '@/utils/constant';

ChartJS.register(ArcElement, Tooltip, Legend);

const mockResp = {
    "status": 200,
    "data": [
        {
            "_id": "67fded1a6602653b3f5b9d53",
            "title": "Sports Events",
            "category": "Sports",
            "likesCount": 2
        },
        {
            "_id": "67fe03d8dcc9697ee1f30850",
            "title": "Gaming event",
            "category": "Gaming",
            "likesCount": 1
        },
        {
            "_id": "67fe3923bc0b4c7a774584f0",
            "title": "Jazz in the Park",
            "category": "Music",
            "likesCount": 1
        },
        {
            "_id": "67fe05f0dcc9697ee1f308ad",
            "title": "Film Festival",
            "category": "Film & Media",
            "likesCount": 0
        },
        {
            "_id": "67fe4347bc0b4c7a7745886e",
            "title": "Test Event",
            "category": "Wellness",
            "likesCount": 0
        }
    ],
    "success": true,
    "message": "OK"
}

const PieChart: React.FC = () => {
    const [labels, setLabels] = useState<string[]>([]);
    const [data, setData] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const endPoint = `${API_ROUTES.ADMIN.TOP_LIKED_EVENTS}?limit=${5}`
                // const response = await apiCall({
                //     endPoint,
                //     method: "GET",
                // });
                // console.log("response", response)

                const topEvents = mockResp.data
                const dynamicLabels = topEvents.map((event) => event.title);
                const dynamicData = topEvents.map((event) => event.likesCount);

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
                backgroundColor: LIGHT_COLORS.slice(0, labels.length),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
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
                        const likesText = value === '1' ? 'Like' : 'Likes';
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

    return <div className="max-h-[350px] w-full flex justify-center">
        <Pie data={chartData} options={options} />
    </div>;
};

export default PieChart;
