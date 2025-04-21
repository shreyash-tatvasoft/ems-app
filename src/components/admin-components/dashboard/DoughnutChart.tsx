'use client';

import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

import React from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
    labels: string[];
    data: number[];
    backgroundColors?: string[];
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({
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
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: '60%', // You can adjust the size of the doughnut hole
        plugins: {
            legend: {
                position: 'right' as const,
            },
        },
    };

    return (
        <Doughnut data={chartData} options={options} />
    );
};

export default DoughnutChart;
