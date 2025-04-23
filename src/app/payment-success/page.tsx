'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import PaymentSuccessPage from '@/components/events-components/PaymentsPage'
import { API_ROUTES } from '@/utils/constant'
import { apiCall } from '@/utils/services/request'

interface CheckoutTicket {
  totalPrice: number
  quantity: number
  type: string
  ticketId: string
}

const PaymentSuccess = () => {
  const [ticketDetails, setTicketDetails] = useState<CheckoutTicket | null>(null)
  const [eventTitle, setEventTitle] = useState<string>('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const storedTickets = sessionStorage.getItem('tickets')
    const storedEventTitle = sessionStorage.getItem('eventTitle')
    const storedEventId = sessionStorage.getItem('eventId')

    const paymentId = searchParams.get('session_id')

    if (!storedTickets || !storedEventTitle || !storedEventId || !paymentId) {
      router.push('/')
      return
    }

    try {
      const parsedTickets: CheckoutTicket = JSON.parse(storedTickets)
      setTicketDetails(parsedTickets)
      setEventTitle(storedEventTitle)

      const creationDate = new Date().toString().split(' (')[0]

      if (!hasSubmitted) {
        const formData = new FormData()
        formData.append('eventId', storedEventId)
        formData.append('ticketId', parsedTickets.ticketId)
        formData.append('seats', parsedTickets.quantity.toString())
        formData.append('totalAmount', parsedTickets.totalPrice.toString())
        formData.append('paymentId', paymentId)
        formData.append('bookingDate', creationDate)

        apiCall({
          endPoint: API_ROUTES.EVENT.PAYMENT,
          method: 'POST',
          body: formData,
          isFormData: true,
          headers: {
            'Content-Type':'application/json'
          },
        }).then(() => {
          setHasSubmitted(true)
        })
      }

      sessionStorage.removeItem('tickets')
      sessionStorage.removeItem('eventTitle')
      sessionStorage.removeItem('eventId')
    } catch (err) {
      console.error('Error parsing session data:', err)
      router.push('/')
    }
  }, [router, searchParams, hasSubmitted])

  if (!ticketDetails) return null

  return (
    <PaymentSuccessPage
      tickets={ticketDetails}
      eventTitles={eventTitle}
    />
  )
}

export default PaymentSuccess
