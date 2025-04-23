'use client';

import React, { memo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import GenericTable from '@/components/common/GenericTable';

interface Column {
    label: string;
    key: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TableModalProps<T = any> {
    open: boolean;
    onClose: () => void;
    columns: Column[];
    data: T[];
    loading?: boolean;
    title?: string;
}

// Wrap the component in memo to optimize re-renders
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableModal = <T extends Record<string, any>>({
    open,
    onClose,
    columns,
    data,
    loading = false,
    title = 'Details',
}: TableModalProps<T>) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <GenericTable columns={columns} data={data} loading={loading} />
            </DialogContent>
        </Dialog>
    );
};

export default memo(TableModal);
