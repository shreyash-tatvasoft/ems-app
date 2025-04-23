'use client';

import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { LIGHT_COLORS } from '@/utils/constant';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    labels: string[];
    data: number[];
}

const PieChart: React.FC<PieChartProps> = ({ labels, data }) => {
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

    const options: ChartOptions<'pie'> = useMemo(() => ({
        responsive: true,
        plugins: {
            legend: { position: 'bottom' as const },
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

    return (
        <div className='min-h-[250px] h-[400px] md:h-[300px] w-full flex items-center justify-center'>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
