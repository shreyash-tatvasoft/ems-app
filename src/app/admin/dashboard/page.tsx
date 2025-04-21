'use client';

import React, { useEffect, useState } from 'react'
import PieChart from '@/components/admin-components/dashboard/PieChart';
import DoughnutChart from '@/components/admin-components/dashboard/DoughnutChart';
import BarChart from '@/components/admin-components/dashboard/BarChart';
import StatCards from '@/components/admin-components/dashboard/StatCards';
import LineChart from '@/components/admin-components/dashboard/LineChart';
import MostBookedUsersTable from '@/components/admin-components/dashboard/MostBookedUsersTable';
import HeatmapWrapper from '@/components/admin-components/dashboard/HeatMapWrapper';
import DateRangeFilter from '@/components/admin-components/dashboard/DateRangeFilter';

function DashboardPage() {
    const labels = ['Cats', 'Dogs', 'Birds', "Cow", "Lion"];
    const data = [5, 20, 10, 5, 20];
    const data2 = [
        {
            label: 'Number of Animals',
            data: [5, 20, 10, 5, 20],
            borderColor: '#4BC0C0',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
    ]
    const [filter, setFilter] = useState({ type: 'overall', value: 'all' });
    useEffect(() => {

        console.log("useEffect-filter", filter)
    }, [filter]);
    return (
        <section className="text-gray-400 p-8">
            <StatCards eventsCount={"1K+"} placesCount={10} revenueCount={200} userCount={100} />

            <div className="flex py-8 gap-[32px]">
                <div className="md:w-1/2 flex flex-col items-center max-h-[400px] bg-white p-8 border-2 border-gray-200 rounded-lg ">
                    <h2 className="text-xl text-black font-semibold">Top 5 Liked Events</h2>

                    <PieChart />
                </div>
                <div className="md:w-1/2 flex flex-col items-center max-h-[400px] bg-white p-8 border-2 border-gray-200 rounded-lg">
                    <DoughnutChart data={data} labels={labels} />
                </div>
            </div>
            <div className="flex pb-8 gap-[32px]">
                <div className="md:w-1/2 flex flex-col items-center max-h-[500px] bg-white p-8 border-2 border-gray-200 rounded-lg ">
                    <DateRangeFilter onChange={setFilter} />
                    <LineChart data={data2} labels={labels} />

                </div>
                <div className="md:w-1/2 flex flex-col items-center max-h-[500px] bg-white p-8 border-2 border-gray-200 rounded-lg ">
                    <BarChart data={data} labels={labels} />
                </div>
            </div>

            <div className='bg-white p-8 border-2 border-gray-200 rounded-lg'>
                <MostBookedUsersTable />
            </div>
            <div className='bg-white p-8 border-2 border-gray-200 rounded-lg mt-8 '>
                <HeatmapWrapper />
            </div>
        </section>
    )
}

export default DashboardPage