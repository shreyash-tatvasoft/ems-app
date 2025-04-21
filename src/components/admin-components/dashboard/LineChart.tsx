'use client';

import React from 'react';
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
    labels: string[];
    data: {
        label: string;
        data: number[];
        borderColor?: string;
        backgroundColor?: string;
    }[];
};

const LineChart: React.FC<LineChartProps> = ({ labels, data }) => {
    const chartData = {
        labels,
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
                position: 'top' as const,
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

    return <Line data={chartData} options={options} />;
};

export default LineChart;
