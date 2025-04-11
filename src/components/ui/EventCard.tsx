import React from 'react'
import { CalendarIcon, MapPinIcon, TicketIcon } from 'lucide-react'
import { EventData } from '@/types/events';
interface EventCardProps {
    event: EventData;
}  
const EventCard = ( {event}:EventCardProps ) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 text-xs font-semibold px-2 py-1 rounded-full">
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-xl mb-2 text-gray-900">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm h-10">
          {event.description}
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <CalendarIcon size={16} className="mr-2 text-gray-400" />
            <span>
              {event.date} • {event.time}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPinIcon size={16} className="mr-2 text-gray-400" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <TicketIcon size={16} className="mr-2 text-gray-400" />
            <span>{event.priceRange}</span>
          </div>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
          View Details
        </button>
      </div>
    </div>
  )
}
export default EventCard
