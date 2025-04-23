'use client';

import dynamic from 'next/dynamic';
const MonthDateHeatmap = dynamic(() => import('./MonthDateHeatmap'), { ssr: false });

export default function HeatmapWrapper() {
    return <MonthDateHeatmap />;
}
