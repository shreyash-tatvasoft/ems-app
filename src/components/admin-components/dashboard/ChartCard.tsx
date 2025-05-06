'use client';

import { Boxes } from 'lucide-react';
import React from 'react';

interface ChartCardProps {
    title?: string;
    children: React.ReactNode;
}
export const chartTitle = (title: string) => {
    return (
        <div>
            <div className='flex items-center gap-2 bg-white px-3 py-1 border-b-2 border-primary shadow-sm rounded-t w-fit'>
                <Boxes />
                <h2 className="text-lg font-semibold text-gray-800 ">
                    {title}
                </h2>
            </div>
        </div>
    )
}
const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
    return (
        <div className="flex flex-col bg-white p-6 border-2 border-gray-200 rounded-lg w-full shadow-lg">
            {title ? chartTitle(title) : <></>}
            {children}
        </div>
    );
};

export default ChartCard;
