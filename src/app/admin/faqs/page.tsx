"use client";

import React from 'react'

// Next Support
import { useRouter } from 'next/navigation';

// Custom Components
import ChartCard from '@/components/admin-components/dashboard/ChartCard'

// Icons
import { MagnifyingGlassIcon, TrashIcon, EyeIcon, PlusIcon } from "@heroicons/react/24/outline"

// Constant imports
import { ROUTES } from '@/utils/constant';

const AdminFaqsPage = () => {
    const router = useRouter()

    const navToFAQCreationPage = () => {
        router.push(ROUTES.ADMIN.CREATE_FAQs)
    }

  return (
    <div className='p-8'>
        <ChartCard>
              <p className="text-2xl font-bold">All FAQs</p>

              {/* Search Bar & Delete All  */}
              <div className="flex justify-between items-center gap-2 space-x-2 w-full my-5">
                  {/* Search Input */}
                  <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <MagnifyingGlassIcon className="h-6 w-6" />
                      </span>
                      <input
                          type="text"
                        //   value={searchQuery}
                        //   onChange={(e) => handleSearch(e.target.value)}
                          placeholder="Search faqs"
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      />
                  </div>

                  <button
                      onClick={navToFAQCreationPage}
                      className="md:flex gap-1 items-center font-bold cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                      <PlusIcon className="w-5 h-5 font-bold" />
                      <p className="hidden md:block">Add</p>
                  </button>
              </div>
        </ChartCard>
    </div>
  )
}

export default AdminFaqsPage