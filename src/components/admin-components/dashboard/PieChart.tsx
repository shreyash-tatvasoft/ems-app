'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';
import { LIGHT_COLORS } from '@/utils/constant';
import { apiCall } from '@/utils/services/request';
import { API_ROUTES } from '@/utils/constant';


interface IData {
    "_id": string,
    "title": string,
    "category": string,
    "likesCount": number
}
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = () => {
    const [labels, setLabels] = useState<string[]>([]);
    const [data, setData] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isDataFetched, setIsDataFetched] = useState<boolean>(false); // Flag to check if data was already fetched

    // Memoize fetchData to prevent unnecessary recreation
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const endPoint = `${API_ROUTES.ADMIN.TOP_LIKED_EVENTS}?limit=5`;
            const response = await apiCall({ endPoint, method: 'GET' });
            const topEvents = response?.data as IData[] || [];

            // Memoize labels and data transformation
            const dynamicLabels = topEvents.map((event) => event.title);
            const dynamicData = topEvents.map((event) => event.likesCount);

            setLabels(dynamicLabels);
            setData(dynamicData);
            setIsDataFetched(true); // Set the flag to prevent further fetching
        } catch (error) {
            console.error('Error fetching pie chart data:', error);
        } finally {
            setLoading(false);
        }
    }, []); // Dependency array ensures fetchData is memoized

    // Call fetchData only if data is not fetched yet
    useEffect(() => {
        if (!isDataFetched) {
            fetchData();
        }
    }, [fetchData, isDataFetched]);

    // Memoize chart data and options
    const chartData = useMemo(() => ({
        labels,
        datasets: [
            {
                label: 'Likes',
                data,
                backgroundColor: LIGHT_COLORS.slice(0, labels.length),
                borderWidth: 1,
            },
        ],
    }), [labels, data]);

    const options = useMemo(() => ({
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            tooltip: {
                callbacks: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    label: (context: any) => {
                        const label = context.label || '';
                        const value = context.formattedValue || 0;
                        const likesText = value === '1' ? 'Like' : 'Likes';
                        return `${label}: ${value} ${likesText}`;
                    },
                },
            },
        },
    }), []);

    // Loading skeleton UI
    if (loading) {
        return (
            <div className="w-full flex justify-center items-center">
                <Skeleton className="h-70 w-70 rounded-full" />
            </div>
        );
    }

    // Render the chart
    return (
        <div className='min-h-[250px] h-[350px] md:h-[300px] w-full flex items-center justify-center'>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
