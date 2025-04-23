'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import DateRangeFilter from '@/components/admin-components/dashboard/DateRangeFilter';
import moment from 'moment';
import { chartTitle } from './ChartCard';
import { Skeleton } from '@/components/ui/skeleton';
import { API_ROUTES } from '@/utils/constant';
import { apiCall } from '@/utils/services/request';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type FilterType = 'overall' | 'monthly' | 'yearly';

interface Filter {
    type: FilterType;
    value: string;
}

interface IData {
    _id: string;
    total: number;
    bookings: number;
}

const defaultChartConfig = {
    label: 'Revenue',
    borderColor: '#4BC0C0',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
};

const LineChart: React.FC = () => {
    const [filter, setFilter] = useState<Filter>({
        type: 'yearly',
        value: moment().format('YYYY'),
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<number[]>([]);

    const chartLabels = useMemo(() => {
        if (filter.type === 'monthly') {
            const daysInMonth = moment(filter.value, 'YYYY-MM').daysInMonth();
            return Array.from({ length: daysInMonth }, (_, i) =>
                moment(filter.value, 'YYYY-MM').date(i + 1).format('D MMM')
            );
        }
        if (filter.type === 'yearly') {
            return moment.months();
        }
        return [];
    }, [filter]);

    const fetchRevenueData = useCallback(async () => {
        setLoading(true);
        try {
            const endPoint = `${API_ROUTES.ADMIN.REVENUE_OVER_TIME}?period=${filter.type}&reference=${filter.value}`;
            const response = await apiCall({ endPoint, method: 'GET' });
            const result = (response?.data?.data as IData[]) || [];
            setData(result.map(item => item.total));
        } catch (err) {
            console.error('Failed to fetch chart data:', err);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchRevenueData();
    }, [fetchRevenueData]);

    const chartData = useMemo(() => ({
        labels: chartLabels,
        datasets: [
            {
                ...defaultChartConfig,
                data,
                fill: false,
                tension: 0.4,
            },
        ],
    }), [chartLabels, data]);

    const chartOptions = useMemo(() => ({
        responsive: true,
        plugins: {
            legend: { position: 'bottom' as const },
            title: { display: false },
        },
        scales: {
            y: { beginAtZero: true },
        },
    }), []);

    return (
        <div>
            <div className="flex justify-between mb-6">
                {chartTitle('Total Revenue Over Time')}
                <DateRangeFilter
                    onChange={setFilter}
                    allowedTypes={['monthly', 'yearly']}
                    initialType={filter.type}
                    initialValue={filter.value}
                />
            </div>

            {loading ? (
                <Skeleton className="w-full h-100 rounded-xl" />
            ) : (
                <div className="min-h-[300px] max-h-[500px] w-full flex items-center justify-center">
                    <Line data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
};

export default LineChart;
