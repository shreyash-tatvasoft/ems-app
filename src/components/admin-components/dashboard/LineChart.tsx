'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton'; // Assuming you’re using a component-based skeleton

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type FilterType = 'overall' | 'monthly' | 'yearly';

interface Filter {
    type: FilterType;
    value: string;
}

interface Dataset {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
}

const LineChart: React.FC = () => {
    const [filter, setFilter] = useState<Filter>({
        type: 'yearly',
        value: moment().format('YYYY'),
    });

    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    useEffect(() => {
        const fetchDatasets = async () => {
            setLoading(true);
            try {
                // const res = await fetch(`/api/chart-data?type=${filter.type}&value=${filter.value}`);
                // const { datasets } = await res.json();

                const mock = [
                    {
                        label: 'Revenue Number',
                        data: [5, 20, 10, 5, 20],
                        borderColor: '#4BC0C0',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    },
                ];
                setDatasets(mock);
            } catch (err) {
                console.error('Failed to fetch chart data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDatasets();
    }, [filter]);

    const chartData = useMemo(() => ({
        labels: chartLabels,
        datasets: datasets.map((set) => ({
            ...set,
            fill: false,
            tension: 0.4,
        })),
    }), [chartLabels, datasets]);

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
                <Skeleton className="w-full h-80 rounded-xl" />
            ) : (
                <Line data={chartData} options={chartOptions} />
            )}
        </div>
    );
};

export default LineChart;
