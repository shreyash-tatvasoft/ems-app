import EventDetails from '@/components/events-components/EventDetails'
import React from 'react'

interface Props {
    params:{
        eventId:string;
    }
}

export default function EventDetailsPage({params}:Props) {
    const { eventId } = params;
  return (
    <EventDetails eventId={eventId}/>
  )
}

