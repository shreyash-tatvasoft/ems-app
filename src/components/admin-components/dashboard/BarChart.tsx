'use client';

import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

import React from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type BarChartProps = {
    labels: string[];
    data: number[];
    backgroundColors?: string[];
};

const BarChart: React.FC<BarChartProps> = ({
    labels,
    data,
    backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
}) => {
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Data',
                data,
                backgroundColor: backgroundColors.slice(0, labels.length),
                borderWidth: 1,
                barThickness: 30,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
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
        <Bar data={chartData} options={options} />
    );
};

export default BarChart;
