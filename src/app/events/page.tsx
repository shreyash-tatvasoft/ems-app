'use client'
import React, { useEffect, useState } from 'react'
import { SearchBar } from '@/components/events-components/SearchBar'
import { CategoryTabs } from '@/components/events-components/CategoryTabs'
import { FilterOptions } from '@/components/events-components/FilterOptions'
import { FeaturedEvent } from '@/components/events-components/FeaturedEvent'
import { EventList } from '@/components/events-components/EventList'
import { API_ROUTES } from '@/utils/constant'
import { EventData, EventCategory, SortOption, EventResponse } from "@/types/events";
import { apiCall } from '@/utils/services/request';
import { getAuthToken } from "@/utils/helper";
import moment from 'moment'
import { getTicketPriceRange } from '../admin/event/helper'
import { areAllTicketsBooked, getEventStatus, isNearbyWithUserLocation } from './event-helper'
import Loader from '@/components/common/Loader'
const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<EventCategory>('all')
  const [sortOption, setSortOption] = useState<SortOption>('none')
  const [loading, setLoading] = useState<boolean>(true)
  const fetchEvents = async () => {
        const response = await apiCall({
          endPoint : API_ROUTES.ADMIN.GET_EVENTS,
          method : "GET", 
          headers:{
            'token':getAuthToken()
          }
        })
        let result = await response;
        if(result && result.success && result.data.length > 0) {
           const receivedArrayObj : EventResponse = result.data
  
           const modifiedArray : EventData[] = await Promise.all (receivedArrayObj.map(async (item) => {
            return {
              id : item._id,
              description:item.description,
              image: item.images?.length > 0 ? item.images[0]?.url : "",
              title: item.title,
              category: item.category,
              date:moment(item.startDateTime).format(
                "DD MMM YYYY, h:mm A"
              ),   
              location: item.location.address,
              priceRange: getTicketPriceRange(item.tickets ),
              isSoldOut: areAllTicketsBooked(item.tickets),
              status:getEventStatus(item.startDateTime,item.endDateTime),
              isFeatured:await isNearbyWithUserLocation(item.location.lat,item.location.lng),
              isLiked:item.isLiked,
            }
           }))
  
          setEvents(modifiedArray)
          setLoading(false)
        } else {
           setEvents([])
           setLoading(false)
        }
  }
  useEffect(()=>{
    fetchEvents(); 
  },[])
  const filteredEvents = events
  .filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .filter((event) =>
    activeCategory === 'all' ? true : event.category === activeCategory
  )
  .sort((a, b) => {
    if (sortOption === 'date-asc') {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortOption === 'date-desc') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortOption === 'title-asc') {
      return a.title.localeCompare(b.title)
    } else if (sortOption === 'title-desc') {
      return b.title.localeCompare(a.title)
    }
    return 0
  })

  const featuredEvent = filteredEvents.find(event => event.isFeatured)
  const regularEvents = filteredEvents.filter(event => !event.isFeatured)
  return (
    
    <div className="mx-auto p-10">
       {loading && <Loader />}
      <h1 className="text-3xl font-bold mb-6">Discover Events</h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FilterOptions sortOption={sortOption} setSortOption={setSortOption} />
      </div>
      <CategoryTabs
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      {featuredEvent && (
        <div className="mb-8 mt-6">
          <h2 className="text-xl font-semibold mb-4">Featured Event</h2>
          <FeaturedEvent event={featuredEvent} />
        </div>
      )}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">All Events</h2>
        <EventList events={regularEvents} />
      </div>
    </div>
  )
}
export default EventsPage