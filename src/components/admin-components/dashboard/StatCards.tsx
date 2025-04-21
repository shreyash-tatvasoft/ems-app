import React from 'react';
import { HandCoins, MapPinCheck, PackageCheck, Users } from 'lucide-react';

interface StatCardsProps {
    userCount: string | number;
    revenueCount: string | number;
    eventsCount: string | number;
    placesCount: string | number;

}

const StatCards: React.FC<StatCardsProps> = ({ userCount, revenueCount, eventsCount, placesCount }) => {
    return (
        <>
            <div className="flex flex-wrap -m-4 text-center">
                <div className="p-4 lg:w-1/4 md:w-1/2 sm:w-1/2 w-full ">
                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-white">
                        <div className="flex justify-between items-center">
                            <Users size={48} className='text-chart-1' />
                            <div>
                                <h2 className="title-font font-medium text-3xl text-gray-900">{userCount}</h2>
                                <p className="leading-relaxed">Users</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 lg:w-1/4 md:w-1/2 sm:w-1/2 w-full">
                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-white">
                        <div className="flex justify-between items-center">
                            <HandCoins size={48} className='text-chart-1' />
                            <div>
                                <h2 className="title-font font-medium text-3xl text-gray-900">{revenueCount}</h2>
                                <p className="leading-relaxed">Revenue</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 lg:w-1/4 md:w-1/2 sm:w-1/2 w-full">
                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-white">
                        <div className="flex justify-between items-center">
                            <PackageCheck size={48} className='text-chart-1' />
                            <div>
                                <h2 className="title-font font-medium text-3xl text-gray-900">{eventsCount}</h2>
                                <p className="leading-relaxed">Events</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="p-4 lg:w-1/4 md:w-1/2 sm:w-1/2 w-full">
                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-white">
                        <div className="flex justify-between items-center">
                            <MapPinCheck size={48} className='text-chart-1' />
                            <div>
                                <h2 className="title-font font-medium text-3xl text-gray-900">{placesCount}</h2>
                                <p className="leading-relaxed">Places</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default StatCards;
