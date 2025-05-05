'use client'
import React, { useState } from 'react'
interface EventDescriptionProps {
  description: string
  initiallyExpanded?: boolean
}
const EventDescription: React.FC<EventDescriptionProps> = ({
  description,
  initiallyExpanded = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-900">Description</h3>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 max-h-96`}
      >
            <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
        />      
        </div>
    </div>
  )
}
export default EventDescription
