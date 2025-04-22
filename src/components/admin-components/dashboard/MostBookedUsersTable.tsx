'use client';

import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function MostBookedUsersTable() {
    return (
        <div>
            <Table>
                {/* <TableCaption>A list of dummy users.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-center">No. of Bookings</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Alice Smith</TableCell>
                        <TableCell>alice@example.com</TableCell>
                        <TableCell className="text-center">50</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Bob Johnson</TableCell>
                        <TableCell>bob@example.com</TableCell>
                        <TableCell className="text-center">10</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell>Charlie Davis</TableCell>
                        <TableCell>charlie@example.com</TableCell>
                        <TableCell className="text-center">8</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Alice Smith</TableCell>
                        <TableCell>alice@example.com</TableCell>
                        <TableCell className="text-center">50</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Bob Johnson</TableCell>
                        <TableCell>bob@example.com</TableCell>
                        <TableCell className="text-center">10</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell>Charlie Davis</TableCell>
                        <TableCell>charlie@example.com</TableCell>
                        <TableCell className="text-center">8</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Alice Smith</TableCell>
                        <TableCell>alice@example.com</TableCell>
                        <TableCell className="text-center">50</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Bob Johnson</TableCell>
                        <TableCell>bob@example.com</TableCell>
                        <TableCell className="text-center">10</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell>Charlie Davis</TableCell>
                        <TableCell>charlie@example.com</TableCell>
                        <TableCell className="text-center">8</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Alice Smith</TableCell>
                        <TableCell>alice@example.com</TableCell>
                        <TableCell className="text-center">50</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
