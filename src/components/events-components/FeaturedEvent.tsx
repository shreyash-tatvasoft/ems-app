'use client'
import React, { useEffect, useState, useRef } from 'react'
import {
  HeartIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ArrowBigLeftIcon,
  ArrowBigRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from 'lucide-react'
import { EventData } from '../../app/events/types'
import { API_ROUTES, ROUTES } from '@/utils/constant'
import { apiCall } from '@/utils/services/request'
import { useRouter } from 'next/navigation'
import { Square3Stack3DIcon } from '@heroicons/react/24/outline'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
interface FeaturedEventProps {
  event: EventData[]
}

export const FeaturedEvent: React.FC<FeaturedEventProps> = ({ event }) => {
  const [likedEvents, setLikedEvents] = useState<{ [key: string]: boolean }>({})
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter();
   
  useEffect(() => {
    const initialLikes = Object.fromEntries(event.map(e => [e.id, e.isLiked]))
    setLikedEvents(initialLikes)
  }, [event])

  useEffect(() => {
    if (event.length <= 1) return

    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % event.length)
    }, 10000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [event.length])

  const handleLikeEvent = async (eventId: string) => {
    const response = await apiCall({
      endPoint: `${API_ROUTES.ADMIN.GET_EVENTS}/${eventId}/like`,
      method: 'POST',
    })
    if (response.success) {
      setLikedEvents(prev => ({
        ...prev,
        [eventId]: !prev[eventId],
      }))
    }
  }

  const statusColors = {
    ongoing: 'bg-yellow-100 text-yellow-800',
    ended: 'bg-red-100 text-red-800',
    upcoming: 'bg-green-100 text-green-800',
  }

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % event.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + event.length) % event.length)
  }
  const navigateToEventDetails=(eventId:string)=>{
      router.push(`${ROUTES.USER_EVENTS}\\${eventId}`);  
  }
  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `100%`,
        }}
      >
        {event.map(ev => {
          const formattedDate = new Date(ev.date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })

          return (
            <div
              key={ev.id}
              className="w-full flex-shrink-0"
              style={{ width: '100%' }}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                    <button
                      onClick={() => handleLikeEvent(ev.id)}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md cursor-pointer"
                    >
                      <HeartIcon
                        className={`h-6 w-6 ${
                          likedEvents[ev.id]
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="p-6 md:w-3/5 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-2xl font-bold">{ev.title}</h2>
                      <span
                        className={`text-sm px-3 py-1 rounded-full ml-3 ${statusColors[ev.status]}`}
                      >
                        {ev.status.charAt(0).toUpperCase() + ev.status.slice(1)}
                      </span>
                    </div>
                    <div
                      className="text-gray-600 mb-6"
                      dangerouslySetInnerHTML={{ __html: ev.description }}
                    />
                  <div className="mt-auto space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Square3Stack3DIcon className="h-4 w-4 mr-2" />
                      <span className='font-bold'>{ev.category}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="truncate max-w-60 font-bold">
                            {ev.location}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-bold cursor-pointer">
                              {ev.location}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span className='font-bold'>{formattedDate}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <TagIcon className="h-4 w-4 mr-2" />
                      <span className='font-bold'>{ev.priceRange}</span>
                    </div>
                  </div>
                    <div className="mt-auto">
                      <button
                        disabled={ev.isSoldOut}
                        onClick={()=>navigateToEventDetails(ev.id)}
                        className={`py-3 px-6 rounded-md font-medium cursor-pointer ${
                          ev.isSoldOut
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {ev.isSoldOut ? 'Sold Out' : 'View Details'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {event.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md cursor-pointer"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md cursor-pointer"
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  )
}
