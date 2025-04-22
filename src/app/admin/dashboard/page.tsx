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
import ChartCard from '@/components/admin-components/dashboard/ChartCard';

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
            <StatCards />

            <div className="flex flex-wrap -m-4">
                <div className="md:w-1/2 p-4">
                    <ChartCard title="Top 5 Liked Events">
                        <PieChart />
                    </ChartCard>
                </div>
                <div className="md:w-1/2 p-4">
                    <ChartCard title="Bookings by Ticket Type">
                        <DoughnutChart />
                    </ChartCard>
                </div>
            </div>
            <div className="flex flex-wrap -m-4 p-4">
                <ChartCard title="Total Revenue Over Time">
                    <DateRangeFilter onChange={setFilter} />
                    <LineChart data={data2} labels={labels} />
                </ChartCard>
            </div>


            <div className="flex flex-wrap -m-4 p-4">
                <ChartCard title="Total Revenue By Category">
                    <BarChart data={data} labels={labels} />
                </ChartCard>
            </div>

            <div className="flex flex-wrap -m-4 p-4">
                <ChartCard title="Top 10 User with Highest Bookings">
                    <MostBookedUsersTable />
                </ChartCard>
            </div>
            <div className='bg-white p-8 border-2 border-gray-200 rounded-lg mt-8 '>
                <HeatmapWrapper />
            </div>
        </section >
    )
}

export default DashboardPage