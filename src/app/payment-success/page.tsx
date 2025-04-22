'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PaymentSuccessPage from '@/components/events-components/PaymentsPage'

interface CheckoutTicket {
  totalPrice: number
  quantity: number
  type: string
}

const PaymentSuccess = () => {
  const [ticketDetails, setTicketDetails] = useState<CheckoutTicket | null>(null)
  const [eventTitle, setEventTitle] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    const storedTickets = sessionStorage.getItem('tickets')
    const storedEventTitle = sessionStorage.getItem('eventTitle')

    if (!storedTickets || !storedEventTitle) {
      router.push('/')
      return
    }

    try {
      const parsedTickets: CheckoutTicket = JSON.parse(storedTickets)
      const parsedEventTitle: string = storedEventTitle

      setTicketDetails(parsedTickets)
      setEventTitle(parsedEventTitle)
    } catch (err) {
      console.error('Error parsing stored session data:', err)
      router.push('/')
    }

    sessionStorage.removeItem('tickets')
    sessionStorage.removeItem('eventTitle')
  }, [router])

  if (!ticketDetails) return null

  return (
    <PaymentSuccessPage
      tickets={ticketDetails}
      eventTitles={eventTitle}
    />
  )
}

export default PaymentSuccess
