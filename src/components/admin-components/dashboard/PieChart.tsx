'use client';

import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Skeleton } from '@/components/ui/skeleton';

ChartJS.register(ArcElement, Tooltip, Legend);

type PieChartProps = {
    backgroundColors?: string[];
};

const PieChart: React.FC<PieChartProps> = ({
    backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#F67019', '#00A86B'],
}) => {
    const [labels, setLabels] = useState<string[]>([]);
    const [data, setData] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Example API call (replace with your actual API endpoint)
        const fetchData = async () => {
            try {
                const labelsss = ['Cats hdsahdkajsdhasjkd aidjakshdksajkdjashdkjashdkjas dajdashdkjashdkjadshk', 'Dogs', 'Birds', "Cow", "Lion", 'Birds', "Cow", "Lion"];
                const dataaaa = [5, 20, 10, 5, 20, 15, 2, 5];

                setLabels(labelsss);
                setData(dataaaa);
            } catch (error) {
                console.error('Error fetching pie chart data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    generateLabels: (chart: any) => {
                        const data = chart.data;
                        if (data.labels && data.datasets.length) {
                            return data.labels.map((label: string, i: number) => {
                                const dataset = data.datasets[0];
                                return {
                                    text: label.length > 20 ? `${label.slice(0, 20)}...` : label, // truncate
                                    fillStyle: dataset.backgroundColor[i],
                                    strokeStyle: dataset.borderColor ? dataset.borderColor[i] : '',
                                    index: i,
                                };
                            });
                        }
                        return [];
                    },
                    usePointStyle: true,
                    boxWidth: 12,
                    padding: 10,
                },
            },
            tooltip: {
                callbacks: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    label: function (context: any) {
                        return `${context.label}: ${context.formattedValue}`;
                    },
                },
            },
        },
    };


    if (loading) {
        return (
            <div className="p-6 w-full flex justify-center items-center">
                <Skeleton className="h-[300px] w-full max-w-[400px] rounded-md" />
            </div>
        );
    }

    return <Pie data={chartData} options={options} />;
};

export default PieChart;
