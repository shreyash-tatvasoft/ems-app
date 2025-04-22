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
    allowedTypes?: FilterType[];
    initialType?: FilterType;
    initialValue?: string;
}

export default function DateRangeFilter({
    onChange,
    allowedTypes = ['overall', 'yearly', 'monthly'],
    initialType,
    initialValue,
}: Props) {
    const now = moment();

    const getInitialType = () => {
        if (initialType && allowedTypes.includes(initialType)) return initialType;
        return allowedTypes[0];
    };

    const getInitialValue = (filterType: FilterType) => {
        if (initialValue) return initialValue;
        if (filterType === 'monthly') return now.format('YYYY-MM');
        if (filterType === 'yearly') return now.format('YYYY');
        return 'all';
    };

    const [type, setType] = useState<FilterType>(getInitialType());
    const [value, setValue] = useState(getInitialValue(getInitialType()));

    useEffect(() => {
        onChange({ type, value });
    }, [onChange, type, value]);

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

    const isPrevDisabled = type === 'overall';
    const isNextDisabled =
        type === 'overall' ||
        moment(value, type === 'monthly' ? 'YYYY-MM' : 'YYYY').isSameOrAfter(now, type === 'monthly' ? 'month' : 'year');

    return (
        <>
            <div>
                <div>
                    <p className="text-sm mb-1 font-bold">Filter By:
                        <span className="ml-2 text-md text-black">
                            {type === 'overall'
                                ? 'All Time'
                                : type === 'monthly'
                                    ? moment(value).format('MMMM YYYY')
                                    : value}
                        </span>
                    </p>
                </div>
                <div className="flex text-black gap-2 items-center">

                    {allowedTypes.length > 1 && (
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
                                {allowedTypes.includes('monthly') && <SelectItem value="monthly">Monthly</SelectItem>}
                                {allowedTypes.includes('yearly') && <SelectItem value="yearly">Yearly</SelectItem>}
                                {allowedTypes.includes('overall') && <SelectItem value="overall">Overall</SelectItem>}
                            </SelectContent>
                        </Select>
                    )}

                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            className="bg-black text-white hover:bg-black/90 disabled:opacity-50 h-8 w-8 p-0 cursor-pointer disabled:cursor-not-allowed"
                            onClick={handlePrev}
                            disabled={isPrevDisabled}
                            title="Previous"
                        >
                            <ChevronLeft className="h-4 w-4 text-white" />
                        </Button>

                        <Button
                            size="sm"
                            className="bg-black text-white hover:bg-black/90 disabled:opacity-50 h-8 w-8 p-0 cursor-pointer disabled:cursor-not-allowed"
                            onClick={handleNext}
                            disabled={isNextDisabled}
                            title="Next"
                        >
                            <ChevronRight className="h-4 w-4 text-white" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
