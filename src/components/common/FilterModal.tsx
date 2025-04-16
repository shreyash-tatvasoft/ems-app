"use client";

import React, { useState} from "react";

// library support
import { XMarkIcon } from "@heroicons/react/24/solid";

// types suppor
import { IFilterModalProps } from "@/utils/types";

const FilterModal: React.FC<IFilterModalProps> = ({
  isOpen,
  onClose,
  applyFilters,
}) => {
  
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-45 flex items-center justify-center bg-black/60 bg-opacity-40">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-xl relative p-6">
        {/* Title Section Start */}
        <div className="flex justify-between items-center border-b-1 py-2 border-b-gray-300">
          <p className="font-bold text-2xl">Filters</p>
          <XMarkIcon onClick={onClose} className="h-6 w-6 cursor-pointer" />
        </div>
        {/* Title Section End */}

        <div className="overflow-auto">
          {/* Content UI Start */}

          <div className="my-5">
            <p className="font-semibold text-lg">Price</p>
          </div>

          <div className="my-5">
            <p className="font-semibold text-lg">Event Dates</p>
          </div>

          <div className="my-5">
            <p className="font-semibold text-lg">Catogory</p>
          </div>

          <div className="my-5">
            <p className="font-semibold text-lg mb-4">Status</p>

            <div className="flex w-full gap-4">
              {/* Upcoming */}
              <button className="flex-1 border-[1px] border-blue-500 text-blue-500 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition cursor-pointer">
                Upcoming
              </button>

              {/* Ongoing */}
              <button className="flex-1 border-[1px] border-blue-500 text-blue-500 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition cursor-pointer">
                Ongoing
              </button>

              {/* Ended */}
              <button className="flex-1 border-[1px] border-blue-500 text-blue-500 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition cursor-pointer">
                Ended
              </button>
            </div>
          </div>

          <div className="my-5">
            <p className="font-semibold text-lg mb-4">Tickets Availability</p>

            <div className="flex gap-4 flex-nowrap">
              {/* Available */}
              <button className="font-bold cursor-pointer border-1 border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-100 transition">
                Available
              </button>

              {/* Filling Fast */}
              <button className="font-bold cursor-pointer border-1 border-yellow-500 text-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-100 transition">
                Filling Fast
              </button>

              {/* Almost Full */}
              <button className="font-bold cursor-pointer border-1 border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-100 transition">
                Almost Full
              </button>

              {/* Sold Out */}
              <button className="font-bold cursor-pointer border-1 border-gray-400 text-gray-400 px-4 py-2 hover:bg-gray-100 rounded-md transition">
                Sold Out
              </button>
            </div>
          </div>

          <div className="my-5">
            <p className="font-semibold text-lg">Duration</p>
          </div>

          {/* Content UI End*/}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-5">
          <button
            onClick={onClose}
            className="w-full cursor-pointer px-4 py-2 rounded-[12px] font-bold border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Clear All
          </button>
          <button
            onClick={applyFilters}
            className="w-full cursor-pointer px-4 py-2 rounded-[12px] font-bold bg-blue-500 text-white hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
