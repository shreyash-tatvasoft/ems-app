"use client";

import React, { useState} from "react";

// library support
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import moment from "moment";

// types suppor
import { IApplyFiltersKey, IFilterModalProps } from "@/utils/types";
import Slider from "./Slider";

const FilterModal: React.FC<IFilterModalProps> = ({
  isOpen,
  onClose,
  applyFilters,
}) => {
  
  const durationOptions = [
    { label: "Short - Less than 1 hour", value: "short" },
    { label: "Medium - 1 to 4 hours", value: "medium" },
    { label: "Long - 4 to 12 hours", value: "long" },
    { label: "Full Day - 12 to 24 hours", value: "fullDay" },
    { label: "Multi-Day - More than 1 day", value: "multiDay" },
  ]

  const CATEGORIES_ITEMS = [
    { id: 1, label: "Music", value: "Music" },
    { id: 2, label: "Art & Culture", value: "Art & Culture" },
    { id: 3, label: "Film & Media", value: "Film & Media" },
    { id: 4, label: "Education", value: "Education" },
    { id: 5, label: "Sports", value: "Sports" },
    { id: 6, label: "Food & Drink", value: "Food & Drink" },
    { id: 7, label: "Wellness", value: "Wellness" },
    { id: 8, label: "Gaming", value: "Gaming" },
    { id: 9, label: "Business", value: "Business" },
  ]

  const STATUS_OPTIONS = [
    { label : "Upcoming", value : "upcoming"},
    { label : "Ongoing", value : "ongoing"},
    { label : "Ended", value : "ended"}
  ]

  const TICKETS_OPTIONS = [
    { label : "Available", value : "available", colorKey : "green"},
    { label : "Filling Fast", value : "fastFilling", colorKey : "yellow"},
    { label : "Almost Full", value : "almostFull", colorKey : "red"},
    { label : "Sold Out", value : "soldOut", colorKey : "gray"}
  ]

  const INITIAL_FILTER_VALUES : IApplyFiltersKey = {
      catogories : [],
      durations : [],
      status : "",
      ticketsTypes : "",
  }

  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [selectedCatogory, setSelectedCatogory] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedTicket, setSelectedTicket] = useState("")
  const [showAll, setShowAll] = useState(false)

  const [date, setDate] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const toggleCheckbox = (value: string) => {
    setSelectedDurations((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }

  const handleCheckboxChange = (checked: boolean, value: string) => {
    setSelectedCatogory((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    )
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCatogory(CATEGORIES_ITEMS.map((item) => item.value))
    } else {
      setSelectedCatogory([])
    }
  }
  const isAllSelected = selectedCatogory.length === CATEGORIES_ITEMS.length

  const visibleCategories = showAll ? CATEGORIES_ITEMS : CATEGORIES_ITEMS.slice(0, 3)
  
  const clearAllFilters = () => {
    setSelectedStatus("")
    setSelectedTicket("")
    setSelectedCatogory([])
    setSelectedDurations([])
    applyFilters(INITIAL_FILTER_VALUES)
  }

  const submitFilters = () => {
    const filterValues: IApplyFiltersKey = {
      catogories: selectedCatogory,
      durations: selectedDurations,
      status: selectedStatus,
      ticketsTypes : selectedTicket
    };
    applyFilters(filterValues);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-45 flex items-center justify-center bg-black/60 bg-opacity-40">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-xl relative">
        {/* Title Section Start */}
        <div className="flex justify-between items-center border-b-1 px-6 py-5 border-b-gray-300">
          <p className="font-bold text-2xl">Filters</p>
          <XMarkIcon onClick={onClose} className="h-6 w-6 cursor-pointer" />
        </div>
        {/* Title Section End */}

        <div className="max-h-96 overflow-auto scrollbar-none border-b-1 px-6 py-0 border-b-gray-300">
          {/* Content UI Start */}

          <div className="my-5">
            <p className="font-semibold text-lg">Price</p>
            <Slider />
          </div>

          <div className="my-5">
            <p className="font-semibold text-lg mb-4">Event Dates</p>

            <div className="w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-300",
                      !date.from && !date.to && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5 text-gray-500" />
                    {date.from ? (
                      date.to ? (
                        <>
                          {moment(date.from).format("MMM DD, YYYY")} -{" "}
                          {moment(date.to).format("MMM DD, YYYY")}
                        </>
                      ) : (
                        moment(date.from).format("MMM DD, YYYY")
                      )
                    ) : (
                      <span className="text-black">Select a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    initialFocus
                    mode="range"
                    selected={date}
                    onSelect={(range) => {
                      setDate({
                        from: range?.from,
                        to: range?.to,
                      });
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="my-5">
            <p className="font-semibold text-lg mb-4">Catogory</p>

            <div className="space-y-4">
              {/* Select All */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={isAllSelected}
                  onCheckedChange={(checked) => handleSelectAll(!!checked)}
                  className="border border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <label
                  htmlFor="select-all"
                  className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  All
                </label>
              </div>

              {/* Categories */}
              {visibleCategories.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={item.value}
                    checked={selectedCatogory.includes(item.value)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(!!checked, item.value)
                    }
                    className="border border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <label
                    htmlFor={item.value}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.label}
                  </label>
                </div>
              ))}

              {/* Toggle Link */}
              {CATEGORIES_ITEMS.length > 3 && (
                <button
                  type="button"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="text-blue-600 text-sm font-medium hover:underline cursor-pointer"
                >
                  {showAll ? "See less" : "See more"}
                </button>
              )}
            </div>
          </div>

          <div className="my-5">
            <p className="font-semibold text-lg mb-4">Status</p>

            <div className="flex w-full gap-4">
              {STATUS_OPTIONS.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedStatus(item.value)}
                    className={`flex-1 border-[1px] border-blue-500 font-semibold px-4 py-2 rounded-md  transition cursor-pointer
                  ${
                    selectedStatus === item.value
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-white text-blue-500 hover:bg-blue-100"
                  }
                  `}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="my-5">
            <p className="font-semibold text-lg mb-4">Tickets Availability</p>

            <div className="flex w-full gap-3">
              {TICKETS_OPTIONS.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedTicket(item.value)}
                    className={`flex-1 border-[1px] border-${item.colorKey}-500 font-semibold p-2 rounded-md  transition cursor-pointer
                  ${
                    selectedTicket === item.value
                      ? `bg-${item.colorKey}-600 text-white hover:bg-${item.colorKey}-700`
                      : `text-${item.colorKey}-500 hover:bg-${item.colorKey}-100`
                  }
                  `}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="my-5">
            <p className="font-semibold text-lg mb-4">Duration</p>

            <div className="space-y-4">
              {durationOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={selectedDurations.includes(option.value)}
                    onCheckedChange={() => toggleCheckbox(option.value)}
                    className="border border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <label
                    htmlFor={option.value}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Content UI End*/}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 p-6">
          <button
            onClick={clearAllFilters}
            className="w-full cursor-pointer px-4 py-2 rounded-[8px] font-bold border border-gray-500 text-gray-700 hover:bg-gray-100"
          >
            Clear All
          </button>
          <button
            onClick={submitFilters}
            className="w-full cursor-pointer px-4 py-2 rounded-[8px] font-bold bg-blue-500 text-white hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
