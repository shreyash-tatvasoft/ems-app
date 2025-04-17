'use client'

import React, { useRef, useEffect, useState } from 'react'

const MIN = 0
const MAX = 100

export default function PriceRangeSlider() {
  const range = useRef<HTMLDivElement>(null)
  const [minVal, setMinVal] = useState(0)
  const [maxVal, setMaxVal] = useState(100)

  const getPercent = (value: number) =>
    Math.round(((value - MIN) / (MAX - MIN)) * 100)

  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(minVal)
      const maxPercent = getPercent(maxVal)
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, maxVal])

  return (
    <div className="w-full">

      {/* Display Range Label */}
      <div className="text-center mb-6 relative">
        <div className="inline-block bg-blue-600 text-white text-sm font-semibold py-1 px-4 rounded-md relative">
          ${minVal} – ${maxVal}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45" />
        </div>
      </div>

      {/* Slider Track */}
      <div className="relative h-2 rounded-full bg-gray-200">
        {/* Filled Range */}
        <div ref={range} className="absolute h-full bg-blue-600 rounded-full" />

        {/* Min Range Input */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={minVal}
          onChange={(e) =>
            setMinVal(Math.min(Number(e.target.value), maxVal - 1))
          }
          className="absolute z-20 w-full appearance-none pointer-events-none bg-transparent h-2 
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:h-5 
          [&::-webkit-slider-thumb]:w-5 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-black 
          [&::-webkit-slider-thumb]:cursor-pointer 
          [&::-webkit-slider-thumb]:pointer-events-auto"
        />

        {/* Max Range Input */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={maxVal}
          onChange={(e) =>
            setMaxVal(Math.max(Number(e.target.value), minVal + 1))
          }
          className="absolute z-10 w-full appearance-none pointer-events-none bg-transparent h-2 
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:h-5 
          [&::-webkit-slider-thumb]:w-5 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-black 
          [&::-webkit-slider-thumb]:cursor-pointer 
          [&::-webkit-slider-thumb]:pointer-events-auto"
        />
      </div>

      {/* Inputs */}
      <div className="mt-6 flex items-center gap-4">
        <div className="w-1/2">
          <label className="text-sm">Min Price</label>
          <input
            type="number"
            className="w-full mt-1 border bg-gray-100 rounded px-3 py-2"
            value={minVal}
            disabled
            readOnly
          />
        </div>
        <div className="w-1/2">
          <label className="text-sm">Max Price</label>
          <input
            type="number"
            className="w-full mt-1 bg-gray-100 border rounded px-3 py-2"
            value={maxVal}
            disabled
            readOnly
          />
        </div>
      </div>
    </div>
  )
}
