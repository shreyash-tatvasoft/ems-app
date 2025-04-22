'use client';

import React, { useEffect, useState } from 'react';
import { HandCoins, MapPinCheck, PackageCheck, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';


const StatCards: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        userCount: 0,
        revenueCount: 0,
        eventsCount: 0,
        placesCount: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {

                setStats({
                    userCount: 12,
                    revenueCount: 12,
                    eventsCount: 12,
                    placesCount: 12,
                });
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const cards = [
        { label: 'Users', value: stats.userCount, Icon: Users },
        { label: 'Revenue', value: stats.revenueCount, Icon: HandCoins },
        { label: 'Events', value: stats.eventsCount, Icon: PackageCheck },
        { label: 'Places', value: stats.placesCount, Icon: MapPinCheck },
    ];

    return (
        <div className="flex flex-wrap -m-4 text-center">
            {cards.map((card, idx) => (
                <div key={idx} className="p-4 lg:w-1/4 md:w-1/2 sm:w-1/2 w-full">
                    <div className="border-2 border-gray-200 px-4 py-6 rounded-lg bg-white">
                        <div className="flex justify-between items-center">
                            {loading ? (
                                <Skeleton className="h-12 w-12 rounded-full" />
                            ) : (
                                <card.Icon size={48} className="text-chart-1" />
                            )}
                            <div className="text-right">
                                {loading ? (
                                    <>
                                        <Skeleton className="h-8 w-20 mb-2" />
                                        <Skeleton className="h-4 w-16" />
                                    </>
                                ) : (
                                    <>
                                        <h2 className="title-font font-medium text-3xl text-gray-900">{card.value}</h2>
                                        <p className="leading-relaxed">{card.label}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatCards;
