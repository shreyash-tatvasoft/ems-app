"use client";
import React from 'react'

// library support
import { usePDF } from "react-to-pdf";
import { QRCodeCanvas } from "qrcode.react";

// Types support
import { IBooking } from '@/app/user/my-events/types'

// Custom css
import "../../app/viewTicket.css"

// Helpers
import { formatDateTime } from '@/app/user/my-events/helper';

// icons
import { XMarkIcon } from "@heroicons/react/24/solid";


interface ITicketProps {
    isOpen: boolean;
  onClose: () => void;
    eventData : IBooking | null
}

const DownloadTicketModal : React.FC<ITicketProps> = ({ eventData, isOpen, onClose }) => {

  if (!isOpen) return null;

  if(eventData === null) return null

    const ticketData = {
        id: "TICKET-123456",
    };

    // Use the usePdf hook
    const { toPDF, targetRef } = usePDF({
        filename: `${eventData.event.title}-${new Date().getTime()}-ticket.pdf`,
    });

    const downoadTicket = () => {
       toPDF()
       onClose()
    }

  return (
    <>

      <div className="fixed inset-0 z-45 flex items-center justify-center bg-black/60 bg-opacity-40">
        <div className="bg-white w-full max-w-xl rounded-lg shadow-xl relative">

        <div className="flex justify-between items-center border-b-1 px-6 py-5 border-b-gray-300">
          <p className="font-bold text-xl">Ticket Details</p>
          <XMarkIcon onClick={onClose} className="h-6 w-6 cursor-pointer" />
        </div>

          <div className="ticket-summary-container" ref={targetRef}>
            <h2 className="ticket-summary-title">Ticket Summary</h2>

              <p className='event-name'>Event Name :  <span className="event-name">{eventData.event.title}</span> </p>
              <p className='event-name'>Event Start Name :  <span className="event-time-text">{formatDateTime(eventData.event.startDateTime) } </span> </p>
              <p className='event-name'>Event End Name :  <span className="event-time-text">{formatDateTime(eventData.event.endDateTime) } </span> </p>
              <p className='event-name'>Event Location:  </p>
              <p className="event-time-text">{eventData.event.location.address} </p>
              <br />

              <p className="scan-text">Scan below QR code at entrace of venue: </p>
              <br/>
              <hr/>

              <div className='qr-box'>
                <br />
                  <QRCodeCanvas 
                     value={JSON.stringify(ticketData)}
                     size={200}
                   />
              </div>

              <br />
          </div>

          <button onClick={() => downoadTicket()} className='px-4 py-2 ml-5 mb-5 font-bold bg-blue-500 text-white cursor-pointer rounded-[8px] text-center hover:bg-blue-600'>
              Download Ticket
          </button>

              
                
        </div>
      </div>
          
    </>
  )
}

export default DownloadTicketModal