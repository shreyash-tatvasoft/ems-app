'use client';

import React from 'react'
import TopEventsChart from '@/components/admin-components/dashboard/TopEventsChart';
import DoughnutChart from '@/components/admin-components/dashboard/DoughnutChart';
import StatCards from '@/components/admin-components/dashboard/StatCards';
import LineChart from '@/components/admin-components/dashboard/LineChart';
import MostBookedUsersTable from '@/components/admin-components/dashboard/MostBookedUsersTable';
import HeatmapWrapper from '@/components/admin-components/dashboard/HeatMapWrapper';
import ChartCard from '@/components/admin-components/dashboard/ChartCard';
import MostRevenueByEvents from '@/components/admin-components/dashboard/MostRevenueByEvents';
import RevenueByCategory from '@/components/admin-components/dashboard/RevenueByCategory';

function DashboardPage() {

    return (
        <section className="text-gray-400 p-8">
            <StatCards />

            <div className="flex flex-wrap -m-4">
                <div className="lg:w-1/2 w-full p-4 h-full">
                    <ChartCard title="Top 5 Liked Events">
                        <TopEventsChart />
                    </ChartCard>
                </div>
                <div className="lg:w-1/2 w-full p-4 h-full">
                    <ChartCard title="Bookings by Ticket Type">
                        <DoughnutChart />
                    </ChartCard>
                </div>
            </div>
            <div className="flex flex-wrap -m-4 p-4">
                <ChartCard>
                    <LineChart />
                </ChartCard>
            </div>


            <div className="flex flex-wrap -m-4">
                <div className="lg:w-1/2 w-full p-4 h-full">
                    <ChartCard title="Top 5 Events by Revenue">
                        <MostRevenueByEvents />
                    </ChartCard>
                </div>
                <div className="lg:w-1/2 w-full p-4 h-full">
                    <ChartCard title="Total Revenue By Category">
                        <RevenueByCategory />
                    </ChartCard>
                </div>
            </div>

            <div className="flex flex-wrap mt-8">
                <ChartCard title="Top 10 User with Multiple Bookings">
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