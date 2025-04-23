'use client';

import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

interface HeatmapChartProps {
    series: ApexAxisChartSeries;
    categories: string[];
}

const HeatmapChart: React.FC<HeatmapChartProps> = ({ series, categories }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<ApexCharts | null>(null);

    useEffect(() => {
        const options: ApexCharts.ApexOptions = {
            chart: {
                type: 'heatmap',
                height: 400,
                toolbar: { show: true },
            },
            plotOptions: {
                heatmap: {
                    shadeIntensity: 1,
                    radius: 6,
                    enableShades: true,
                    colorScale: {
                        ranges: [
                            { from: 0, to: 2, color: '#C1F0F6', name: 'Low' },
                            { from: 3, to: 5, color: '#FADADD', name: 'Medium' },
                            { from: 6, to: 10, color: '#90B4ED', name: 'High' },
                        ],
                    },
                },
            },
            dataLabels: { enabled: false },
            xaxis: {
                type: 'category',
                title: { text: 'Date (Day)' },
                categories,
            },
            yaxis: {
                title: { text: 'Month' },
                labels: {
                    rotate: 0,
                    offsetY: 4,
                },
            },
            tooltip: {
                y: {
                    formatter: (val: number) => `${val} bookings`,
                },
            },
            series,
        };

        if (chartRef.current) {
            chartInstance.current = new ApexCharts(chartRef.current, options);
            chartInstance.current.render();
        }

        return () => {
            chartInstance.current?.destroy();
            chartInstance.current = null;
        };
    }, [series, categories]); // fully remounts on change

    return <div ref={chartRef} />;
};

export default HeatmapChart;
