"use client"

import React, { useState, useEffect } from 'react'

// Custom Components
import Loader from '@/components/common/Loader'
import TooltipWrapper from '@/components/common/TooltipWrapper'

// Contsant & Helper Imports
import { apiCall } from '@/utils/services/request'
import { API_ROUTES } from '@/utils/constant'
import { formatDateTime, getTicketTypes } from './helper'

// Types import
import { IEventBookingResponse, IEventsState } from './types'

// Library imports
import moment from 'moment'
import { CalendarDays, Clock9, MapPin, IndianRupee, Ticket } from 'lucide-react'


const MyEventsPage = () => {
    const [myEvents, setMyEvents] = useState<IEventsState[]>([])
    const [loading, setLoading] = useState(true)

    const fetchMyEvents = async () => {
        const result : IEventBookingResponse = await apiCall({
            endPoint : API_ROUTES.EVENT.MY_EVENTS,
            method : "GET",
            withToken : true
        })

        if(result && result.success) {
            const eventsArray = result.data.map(item => {
                return {
                    id : item._id,
                    eventBookedOn : moment(item.bookingDate).format("DD MMM YYYY, [at] hh:mm:ss A"),
                    eventName : item.event.title,
                    eventCatogory : item.event.category,
                    eventStartTime : formatDateTime(item.event.startDateTime),
                    eventEndTime : formatDateTime(item.event.endDateTime),
                    eventDuration: item.event.duration,
                    eventLocation : item.event.location.address,
                    eventTicketCount : item.seats,
                    eventTicketType : getTicketTypes(item.event.tickets, item.ticket),
                    eventTicketPrice: item.totalAmount,
                    eventStatus : "",
                    eventImage : item.event.images.length > 0 ? item.event.images[0].url  : ""
                }
            })

            setMyEvents(eventsArray)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMyEvents()
    },[])


    return (
        <div>
            {loading && <Loader />}

            <div className='mx-auto p-10'>
                <h1 className="text-3xl font-bold mb-6">My Events</h1>

                <div className='flex flex-col md:flex-row gap-5'>
                    {myEvents.length > 0 && myEvents.map(item =>
                        <div key={item.id} className='bg-white border border-gray-100 p-5 rounded-xl w-full shadow-lg'>
                            <p className='text-md pb-2 border-b border-b-gray-200'>Tickets booked on : <span className='font-bold'>{item.eventBookedOn}</span></p>
                            <div className='flex gap-5 my-5 pb-2 border-b border-b-gray-200'>
                                <div className='w-1/3'>
                                   <img 
                                     src={item.eventImage}
                                     className='rounded-lg w-full h-60'
                                   />
                                </div>

                                <div>
                                    <p className='text-xl font-bold mb-1'>{item.eventName}</p>
                                    <p className='text-gray-500 mb-3'>{item.eventCatogory}</p>

                                    <div className='flex gap-3 items-center my-2'>
                                        <CalendarDays className='h-5 w-5' />
                                        <p className='text-gray-800 text-md'>{item.eventStartTime} - {item.eventEndTime}</p>
                                    </div>

                                    <div className='flex gap-3 items-center my-2'>
                                        <Clock9 className='h-5 w-5' />
                                        <p className='text-gray-800 text-md'>{item.eventDuration}</p>
                                    </div>

                                    <div className='flex gap-3 items-center my-2'>
                                        <MapPin className='h-5 w-5' />
                                        <TooltipWrapper tooltip={item.eventLocation}>
                                            <p className='text-gray-800 text-md'>{item.eventLocation}</p>
                                        </TooltipWrapper>
                                    </div>

                                    <div className='flex gap-3 items-center my-2'>
                                        <Ticket className='h-5 w-5' />
                                        <p className='text-gray-800 font-bold'>{item.eventTicketCount} {item.eventTicketCount === 1 ? "ticket" : "tickets"} of
                                            <span className='text-blue-500'> &nbsp;
                                                <TooltipWrapper tooltip={`Cost per ticket : ${item.eventTicketPrice/item.eventTicketCount} Rs.`}>
                                                    {item.eventTicketType}
                                                </TooltipWrapper>
                                            </span> catogory
                                        </p>
                                    </div>

                                    <div className='flex gap-3 items-center my-2'>
                                        <IndianRupee className='h-5 w-5' />
                                        <p className='text-gray-800 font-bold'>Total Paid : {item.eventTicketPrice} Rs.</p>
                                    </div>

                                </div>


                            </div>
                            <div>
                                <div className='flex gap-3 items-center'>
                                    <button
                                      className='px-4 py-2 mr-3 bg-red-900 hover:bg-red-950 text-white rounded-[8px]'
                                    >
                                         FINISHED
                                    </button>
                                    <div className='pl-5 text-xl text-gray-800 border-l border-l-gray-400'>
                                        Hope you enjoyed this Event.  Please give your <span className='text-blue-500 cursor-pointer hover:underline'>feedback</span> here.
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default MyEventsPage