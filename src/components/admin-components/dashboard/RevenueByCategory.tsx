'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BarChart from './BarChart';
import { Skeleton } from '@/components/ui/skeleton';
import { CATOGORIES_ITEMS_ARRAY } from '@/utils/constant';
// import { API_ROUTES } from '@/utils/constant';
// import { apiCall } from '@/utils/services/request';

interface IData {
    totalRevenue: number;
    eventTitle: string;
}
const labels = CATOGORIES_ITEMS_ARRAY.map((item) => item.label)

const mockData = [5700, 1500, 12000, 3000, 1000, 2000, 10000, 15000, 1200]

const RevenueByCategory = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IData[]>([]);

    const fetchData = useCallback(async () => {
        setLoading(true);

        try {
            // const endPoint = `${API_ROUTES.ADMIN.TOP_REVENUE_BY_EVENTS}?limit=5`;
            // const response = await apiCall({ endPoint, method: 'GET' });
            // setData(response?.data || []);

        } catch (error) {
            console.error('Error fetching bar chart data:', error);
            setData([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // const chartLabels = useMemo(() => data.map((item) => item.eventTitle), [data]);
    // const chartData = useMemo(() => data.map((item) => item.totalRevenue), [data]);

    return (
        <div className="w-full max-w-2xl mx-auto">
            {loading ? (
                <div className="space-y-4">
                    <Skeleton className="h-75 w-full rounded-md" />
                </div>
            ) : (
                <BarChart data={mockData} labels={labels} />
            )}
        </div>
    );
};

export default RevenueByCategory;
