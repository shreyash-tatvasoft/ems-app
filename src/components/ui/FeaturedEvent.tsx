import React from 'react'
import { CalendarIcon, MapPinIcon, TicketIcon } from 'lucide-react'
import { EventData } from '@/types/events'
interface EventCardProps {
    event: EventData;
}  
const FeaturedEvent = ({event}:EventCardProps ) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
          <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3 w-fit">
            FEATURED EVENT
          </div>
          <h2 className="text-3xl font-bold mb-2">{event.title}</h2>
          <p className="text-white/90 mb-4 line-clamp-2">{event.description}</p>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <CalendarIcon size={18} className="mr-2" />
              <span>
                {event.date} • {event.time}
              </span>
            </div>
            <div className="flex items-center">
              <MapPinIcon size={18} className="mr-2" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <TicketIcon size={18} className="mr-2" />
              <span>{event.priceRange}</span>
            </div>
          </div>
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition duration-200 w-full sm:w-auto">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
export default FeaturedEvent
