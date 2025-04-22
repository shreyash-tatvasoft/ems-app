'use client';

import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`); // '1' to '31'
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const generateFlippedHeatmapData = () => {
    return months.map((month) => ({
        name: month,
        data: days.map(day => ({
            x: day,
            y: Math.floor(Math.random() * 10),
        })),
    }));
};
console.log("HEATMAP", generateFlippedHeatmapData())
const MonthDateHeatmap = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const series = generateFlippedHeatmapData();

        const options: ApexCharts.ApexOptions = {
            chart: {
                type: 'heatmap',
                height: 400,
                toolbar: { show: true },
            },
            plotOptions: {
                heatmap: {
                    shadeIntensity: 1,
                    radius: 4,
                    enableShades: true,
                    colorScale: {
                        ranges: [
                            { from: 0, to: 2, color: '#90C67C', name: 'Low' },
                            { from: 3, to: 6, color: '#67AE6E', name: 'Medium' },
                            { from: 7, to: 10, color: '#328E6E', name: 'High' },
                        ],
                    },
                },
            },
            dataLabels: { enabled: false },
            xaxis: {
                type: 'category',
                title: { text: 'Date (Day)' },
                categories: days,
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
            const chart = new ApexCharts(chartRef.current, options);
            chart.render();

            return () => chart.destroy();
        }
    }, []);

    return (
        <div>
            <h3 className="text-lg font-semibold mb-3">Bookings by Month and Date</h3>
            <div ref={chartRef} />
        </div>
    );
};

export default MonthDateHeatmap;
