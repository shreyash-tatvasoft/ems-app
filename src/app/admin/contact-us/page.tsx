"use client"
import React, { useState } from 'react'

import ChartCard from '@/components/admin-components/dashboard/ChartCard'

import { MagnifyingGlassIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline"
import TooltipWrapper from '@/components/common/TooltipWrapper'

const AdminContactUsPage = () => {

    const [selectedIds, setSelectedIds] = useState<string[]>([])

    const selectParticulartRowId = (id: string) => {
        setSelectedIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(id)) {
                // If the id is already in the array, remove it
                return prevSelectedIds.filter((item) => item !== id);
            } else {
                // If the id is not in the array, add it
                return [...prevSelectedIds, id];
            }
        });
    };

    const selectAllRowsId = () => {
        const allIds = dummyData.map(item => item.id)
        setSelectedIds(prev =>
            prev.length === allIds.length ? [] : allIds
          );
    }

    const deleteRequestById = () => {
        console.log("first", selectedIds)
    }

    const dummyData = [
        {
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
          subject: "Need Admin support",
          message: "I want to collaborate with Admin and I want to host a big event in the upcoming month.",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          subject: "Event scheduling issue",
          message: "I need assistance with rescheduling my event, as there are conflicts in the time slots.",
        },
        {
          id: "3",
          name: "Samuel Jackson",
          email: "samuel.jackson@example.com",
          subject: "Request for feature",
          message: "I'd love to see a feature where I can track the event's attendees and ticket sales in real-time.",
        },
        {
          id: "4",
          name: "Lucy Brown",
          email: "lucy.brown@example.com",
          subject: "Urgent support needed",
          message: "I am facing issues with the platform crashing when I try to upload event details.",
        },
        {
          id: "5",
          name: "Robert White",
          email: "robert.white@example.com",
          subject: "Feedback on the service",
          message: "The platform is amazing! But I think there could be more customization options for the event page.",
        },
        {
          id: "6",
          name: "Sarah Green",
          email: "sarah.green@example.com",
          subject: "Ticketing issues",
          message: "The event tickets are not showing the correct availability status. Can you help fix this?",
        },
      ];
      
  return (
    <div className='p-8'>

          <ChartCard>
              <p className="text-2xl font-bold">All Support Requests</p>

              {/* Search Bar & Delete All  */}
              <div className="flex  items-baseline sm:items-center sm:flex-row flex-col gap-2 space-x-2 w-full md:w-[60%] my-5">
                  {/* Search Input */}
                  <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <MagnifyingGlassIcon className="h-6 w-6" />
                      </span>
                      <input
                          type="text"
                          // value={searchQuery}
                          // onChange={(e) => searchEvents(e.target.value)}
                          placeholder="Search requests"
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      />
                  </div>

              </div>

              {/* Selected Row */}
              {selectedIds.length > 0 &&
                <div className='px-6 py-4 flex justify-between bg-blue-100 items-center mb-5'>
                  <p className='text-gray-700 font-bold'>{selectedIds.length} selected</p>
                  <TrashIcon onClick={deleteRequestById} className='h-5 w-5 text-gray-800 cursor-pointer' />
              </div>
              }

              {/* TABLE  */}
              <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                      <thead className="bg-gray-700 whitespace-nowrap">
                          <tr>
                              <th className="pl-4 w-8">
                                  <input
                                      type="checkbox"
                                      className="form-checkbox accent-[#2563EB] h-5 w-5 cursor-pointer"
                                      checked={selectedIds.length === dummyData.length}
                                      onChange={() => selectAllRowsId()}
                                  />
                              </th>
                              <th className="p-4 text-left font-medium text-white">Name</th>
                              <th className="p-4 text-left font-medium text-white">Email</th>
                              <th className="p-4 text-left font-medium text-white">Subject</th>
                              <th className="p-4 text-left font-medium text-white">Message</th>
                              <th className="p-4 text-left font-medium text-white">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="whitespace-nowrap">
                          {dummyData.map(item => 
                              <tr key={item.id} className="even:bg-blue-50">
                                  <td className="pl-4 w-8">
                                      <input
                                          type="checkbox"
                                          className="form-checkbox accent-[#2563EB] h-5 w-5 cursor-pointer"
                                          checked={selectedIds.includes(item.id)}
                                          onChange={() => selectParticulartRowId(item.id)}
                                      />
                                  </td>
                                  <td className="p-4 text-slate-900 font-medium">{item.name}</td>
                                  <td className="p-4 text-slate-600 font-medium">{item.email}</td>
                                  <td className="p-4 text-slate-600 font-medium">{item.subject}</td>
                                  <td className="p-4 text-slate-600 font-medium">
                                    <TooltipWrapper tooltip={`${item.message}`}>
                                         <p className='max-w-60 truncate'>{item.message}</p>
                                    </TooltipWrapper>
                                  </td>
                                  <td className="p-4">
                                      <button
                                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                      >
                                          <EyeIcon className="h-5 w-5" />
                                      </button>
                                  </td>
                              </tr>
                          )}
                      </tbody>
                  </table>
              </div>

          </ChartCard>

    </div>
  )
}

export default AdminContactUsPage