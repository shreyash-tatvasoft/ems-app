'use client'

import React, { useEffect } from 'react'
import { CheckCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const PaymentSuccessPage = ({
  tickets,
  eventTitles,
}: {
  tickets: { totalPrice: number; quantity: number; type: string }
  eventTitles: string
}) => {
  const router = useRouter()

  useEffect(() => {
    if (!tickets) {
      router.push('/')
    }
  }, [tickets, router])

  if (!tickets) return null

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircleIcon className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your tickets have been confirmed.
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-4 my-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Event</span>
              <span className="font-medium text-gray-900">{eventTitles}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ticket Type</span>
              <span className="font-medium text-gray-900">{tickets.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity</span>
              <span className="font-medium text-gray-900">
                {tickets.quantity}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-medium text-gray-900">
                ${tickets.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            A confirmation email has been sent to your registered email address.
          </p>
          <button
            onClick={() => router.push('/events')}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessPage
