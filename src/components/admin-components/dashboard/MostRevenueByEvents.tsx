'use client';

import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
import { Skeleton } from '@/components/ui/skeleton';

const mock = {
    status: 200,
    data: [
        { totalRevenue: 2515, eventTitle: 'New Gaming' },
        { totalRevenue: 6284, eventTitle: 'Jazz in the Park' },
        { totalRevenue: 500, eventTitle: 'Sports Events' },
    ],
    success: true,
    message: 'OK',
};

const MostRevenueByEvents = () => {
    const [loading, setLoading] = useState(true);
    const [chartLabels, setChartLabels] = useState<string[]>([]);
    const [chartData, setChartData] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = mock.data;

                const dynamicLabels = response.map((item) => item.eventTitle);
                const dynamicData = response.map((item) => item.totalRevenue);

                setChartLabels(dynamicLabels);
                setChartData(dynamicData);
            } catch (error) {
                console.error('Error fetching bar chart data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto">
            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-64 w-full rounded-md" />
                </div>
            ) : (
                <BarChart data={chartData} labels={chartLabels} />
            )}
        </div>
    );
};

export default MostRevenueByEvents;
