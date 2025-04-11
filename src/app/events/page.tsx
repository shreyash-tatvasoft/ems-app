'use client';
import React, { useState } from 'react'
import FeaturedEvent from '@/components/ui/FeaturedEvent'
import EventCard from '@/components/ui/EventCard';
import { CATEGORIES,EVENT_DATA } from '@/utils/constant';
import { Category, EventData } from "@/types/events"
const EventsPage = () => {
  const events : EventData[] = EVENT_DATA;
  const categories : Category[] = CATEGORIES;
  const [selectedCategory, setSelectedCategory] = useState('all')
  const filteredEvents =
    selectedCategory === 'all'
      ? events
      : events.filter((event) => event.category === selectedCategory)
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Upcoming Events
        </h1>
        <p className="text-gray-600">
          Discover and book tickets for the best events in your area
        </p>
      </header>
      <div className="flex overflow-x-auto space-x-2 mb-8 pb-2 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
          >
            <span className="mr-2"><category.icon size={20}/></span>
            {category.name}
          </button>
        ))}
      </div>
      {filteredEvents.length > 0 && <FeaturedEvent event={filteredEvents[0]} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredEvents.slice(1).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {filteredEvents.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No events found in this category
          </p>
        </div>
      )}
    </div>
  )
}
export default EventsPage
