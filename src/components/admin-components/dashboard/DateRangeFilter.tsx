'use client';

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

type FilterType = 'overall' | 'monthly' | 'yearly';

interface FilterValue {
    type: FilterType;
    value: string;
}

interface Props {
    onChange: (filter: FilterValue) => void;
}

export default function DateRangeFilter({ onChange }: Props) {
    const [type, setType] = useState<FilterType>("yearly");
    const [value, setValue] = useState(getInitialValue('yearly'));

    useEffect(() => {
        onChange({ type, value });
    }, [onChange, type, value]);

    function getInitialValue(filterType: FilterType) {
        const now = moment();
        if (filterType === 'monthly') return now.format('YYYY-MM');
        if (filterType === 'yearly') return now.format('YYYY');
        return 'all';
    }

    function handlePrev() {
        const current = moment(value, type === 'monthly' ? 'YYYY-MM' : 'YYYY');
        if (type === 'monthly') {
            setValue(current.subtract(1, 'month').format('YYYY-MM'));
        } else if (type === 'yearly') {
            setValue(current.subtract(1, 'year').format('YYYY'));
        }
    }

    function handleNext() {
        const current = moment(value, type === 'monthly' ? 'YYYY-MM' : 'YYYY');
        if (type === 'monthly') {
            setValue(current.add(1, 'month').format('YYYY-MM'));
        } else if (type === 'yearly') {
            setValue(current.add(1, 'year').format('YYYY'));
        }
    }

    const now = moment();
    const isPrevDisabled = type === 'overall';
    const isNextDisabled =
        type === 'overall' || moment(value, type === 'monthly' ? 'YYYY-MM' : 'YYYY').isSameOrAfter(now, type === 'monthly' ? 'month' : 'year');

    return (
        <div className="flex text-black gap-2 items-center">
            <div className="min-w-[100px] text-center text-sm text-black">
                {type === 'overall'
                    ? 'All Time'
                    : type === 'monthly'
                        ? moment(value).format('MMMM YYYY')
                        : value}
            </div>
            <Select
                value={type}
                onValueChange={(val: FilterType) => {
                    setType(val);
                    setValue(getInitialValue(val));
                }}
            >
                <SelectTrigger className="w-[150px] focus:outline-none focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Select Range" />
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </SelectTrigger>
                <SelectContent>
                    {/* <SelectItem value="overall">Overall</SelectItem> */}
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
            </Select>


            <div className="flex items-center gap-2">
                <Button variant="outline" className='cursor-pointer' onClick={handlePrev} disabled={isPrevDisabled}>
                    <ChevronLeft />

                </Button>
                <Button variant="outline" className='cursor-pointer' onClick={handleNext} disabled={isNextDisabled}>
                    <ChevronRight />
                </Button>
            </div>
        </div>
    );
}
