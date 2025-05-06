'use client';

import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import ApexCharts from 'apexcharts';
import { IHeatmapChartProps } from '@/app/admin/dashboard/types';

const HeatmapChart: React.FC<IHeatmapChartProps> = ({ series, categories }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<ApexCharts | null>(null);

    // Memoized chart options
    const chartOptions = useMemo<ApexCharts.ApexOptions>(() => ({
        chart: {
            type: 'heatmap',
            height: 400,
            toolbar: { show: false },
        },
        plotOptions: {
            heatmap: {
                shadeIntensity: 1,
                radius: 6,
                enableShades: true,
                colorScale: {
                    ranges: [
                        { from: 0, to: 2, color: '#D1F8EF', name: 'Low' },
                        { from: 3, to: 5, color: '#578FCA', name: 'Medium' },
                        { from: 6, to: 10, color: '#003285', name: 'High' },
                    ],
                },
            },
        },
        legend: {
            position: 'bottom',
            offsetY: 16, 
            offsetX: 0,  
            markers: {
                size: 12,
                height: 12,
                radius: 8,
            },
            itemMargin: {
                horizontal: 8,
                vertical: 8, 
            },
        },
        dataLabels: { enabled: false },
        xaxis: {
            type: 'category',
            categories,
        },
        yaxis: {
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
    }), [series, categories]);

    // Render chart
    const renderChart = useCallback(() => {
        if (chartRef.current) {
            chartInstance.current = new ApexCharts(chartRef.current, chartOptions);
            chartInstance.current.render();
        }
    }, [chartOptions]);

    useEffect(() => {
        renderChart();
        return () => {
            chartInstance.current?.destroy();
            chartInstance.current = null;
        };
    }, [renderChart]);

    return <div ref={chartRef} />;
};

export default HeatmapChart;
