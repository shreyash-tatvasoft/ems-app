'use client';

import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';

type User = {
    "totalBookings": number,
    "userId": string,
    "name": string,
    "email": string
};

const mock = {
    "status": 200,
    "data": [
        {
            "totalBookings": 15,
            "userId": "67f79cf58ad8054db0f8b755",
            "name": "Shreyash",
            "email": "shreyash@yopmail.comshidkjhkajsgfkajhsfkhasdjadhkjadhkjasdhjk"
        },
        {
            "totalBookings": 5,
            "userId": "67efa831873f1385d9acd091",
            "name": "Pritesh Makasana",
            "email": "pritesh@yopmail.com"
        },
        {
            "totalBookings": 2,
            "userId": "67f77d053f686aa6bc283833",
            "name": "Devanshi Shah2",
            "email": "devanshi1@yopmail.com"
        }
    ],
    "success": true,
    "message": "OK"
}
function TruncatedCell({ text }: { text: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className={`block truncate whitespace-nowrap overflow-hidden max-w-[200px]`}>
                        {text}
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p className='text-white'>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
export default function MostBookedUsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulate API call - replace with actual fetch/axios call
        async function fetchUsers() {
            setLoading(true);
            try {
                // const res = await fetch('/api/admin/most-booked-users'); // Replace with actual endpoint
                // const data = await res.json();
                setUsers(mock.data);
                // setUsers([]);
            } catch (error) {
                console.error('Failed to fetch users', error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    const loadingSkeleton = () => {
        return (
            <>
                {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell><Skeleton className="h-4 w-10" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-[180px]" /></TableCell>
                        <TableCell className="text-center"><Skeleton className="h-4 w-8 mx-auto" /></TableCell>
                    </TableRow>
                ))}
            </>
        )
    }

    return (
        <div>
            <Table>
                {loading ? loadingSkeleton() :
                    <>
                        <TableHeader>
                            <TableRow className='hover:bg-transparent'>
                                <TableHead className="w-[100px] font-bold">ID</TableHead>
                                <TableHead className='font-bold'>Name</TableHead>
                                <TableHead className='font-bold'>Email</TableHead>
                                <TableHead className="text-center font-bold">Total No. of Bookings</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.length ? users.map((user, index) => (
                                <TableRow key={user.userId} className='hover:bg-transparent text-gray-800'>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell><TruncatedCell text={user.name} /></TableCell>
                                    <TableCell><TruncatedCell text={user.email} /></TableCell>
                                    <TableCell className="text-center">{user.totalBookings}</TableCell>
                                </TableRow>
                            )) :
                                <TableRow className='hover:bg-transparent'>
                                    <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                                        No data available.
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </>}

            </Table>
        </div>
    );
}
