'use client'
import React, { useEffect, useState } from 'react'

// Custom components
import { SearchBar } from '@/components/events-components/SearchBar'
import { CategoryTabs } from '@/components/events-components/CategoryTabs'
import { FilterOptions } from '@/components/events-components/FilterOptions'
import { FeaturedEvent } from '@/components/events-components/FeaturedEvent'
import { EventList } from '@/components/events-components/EventList'
import Loader from '@/components/common/Loader'
import FilterModal from '@/components/common/FilterModal'

// Constant support
import { API_ROUTES } from '@/utils/constant'
import { getTicketPriceRange } from '../admin/event/helper'
import { getAuthToken } from "@/utils/helper";
import { areAllTicketsBooked, convertFiltersToArray, getEventStatus, isNearbyWithUserLocation, removeFilterFromObject } from './event-helper'

// Types support
import { EventData, EventCategory, SortOption, EventResponse } from "@/types/events";
import { IApplyFiltersKey } from '@/utils/types'
import { LabelValue } from './types'

// Api services
import { apiCall } from '@/utils/services/request';

// Other library
import moment from 'moment'

// Icons & Images
import { FunnelIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from "@heroicons/react/24/solid";


const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<EventCategory>('all')
  const [sortOption, setSortOption] = useState<SortOption>('none')
  const [loading, setLoading] = useState<boolean>(true)
  
  const [filterModal, setFilterModal] = useState<boolean>(false)
  const [appliedFilters, setAppliedFilters] = useState<IApplyFiltersKey>({})
  const [appliedFiltersArray, setAppliedFiltersArray] = useState<LabelValue[]>([])


  const openFilterModal = () => setFilterModal(true)

  const closeFilterModal = () => setFilterModal(false)

  const applyFilters = (filterValues : IApplyFiltersKey) => {
    const results = convertFiltersToArray(filterValues)
    console.log("first", filterValues)
    setAppliedFilters(filterValues)
    setAppliedFiltersArray(results)
  }

  const removeFilterChip = (key : keyof IApplyFiltersKey, value : string) => {
    const modifiedArray = appliedFiltersArray.filter(item => item.value !== value)
    const updatedFiltersObject = removeFilterFromObject(key,value,appliedFilters)
    setAppliedFilters(updatedFiltersObject)
    setAppliedFiltersArray(modifiedArray)
    console.log("first", updatedFiltersObject)
  }

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
        <div className='flex gap-2'>

          <button
            onClick={openFilterModal}
            className="flex items-center cursor-pointer bg-white border-1 text- px-4 py-2 text-sm font-medium text-gray-700 border-gray-300 rounded-lg"
          >
            <FunnelIcon className="w-5 h-5 font-bold mr-2" />
            Filters
          </button>

        <FilterOptions sortOption={sortOption} setSortOption={setSortOption} />
        </div>

      </div>

      <div className='my-3 flex flex-wrap gap-2' >

        {appliedFiltersArray.map((item, index) => {
          return (
            <div key={index} className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 gap-2">
              <p className='text-blue-600 text-lg font-semibold'> {item.label} </p>
              <button className='cursor-pointer' onClick={() => removeFilterChip(item.rowKey, item.value)}>
                <XMarkIcon className='h-5 w-5 font-bold text-blue-500 hover:text-blue-700 focus:outline-none' />
              </button>
            </div>
          )
        })}

      </div>
      {/* <CategoryTabs
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      /> */}

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

      <FilterModal
        isOpen={filterModal}
        onClose={closeFilterModal}
        applyFilters={(values) => applyFilters(values)}
      />
    </div>
  )
}
export default EventsPage