'use client';

import React, { useEffect, useState } from 'react';
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

// Register required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type LineChartProps = {
    data: {
        label: string;
        data: number[];
        borderColor?: string;
        backgroundColor?: string;
    }[];
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {

    const [filter, setFilter] = useState({ type: 'overall', value: 'all' });
    const [chartLabels, setChartLabels] = useState<string[]>([]);

    useEffect(() => {
        console.log("useEffect-filter", filter)
    }, [filter]);

    useEffect(() => {
        if (filter.type === 'monthly') {
            const daysInMonth = moment(filter.value, 'YYYY-MM').daysInMonth();
            const month = moment(filter.value, 'YYYY-MM');
            const newLabels = Array.from({ length: daysInMonth }, (_, i) =>
                month.clone().date(i + 1).format('D MMM')
            );
            setChartLabels(newLabels);
        } else if (filter.type === 'yearly') {
            const newLabels = moment.months(); // ['January', 'February', ..., 'December']
            setChartLabels(newLabels);
        }
    }, [filter]);


    const chartData = {
        labels: chartLabels,
        datasets: data.map((set) => ({
            ...set,
            fill: false,
            tension: 0.4, // For curve/smooth lines
        })),
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <div className="flex justify-end">
                <DateRangeFilter onChange={setFilter} />
            </div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineChart;
