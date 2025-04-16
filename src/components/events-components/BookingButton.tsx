import React from 'react'
interface BookingButtonProps {
  isLoggedIn: boolean
  isFree: boolean
  availableSeats: number
  totalSeats: number
  price: number
}
const BookingButton: React.FC<BookingButtonProps> = ({
  isLoggedIn,
  isFree,
  availableSeats,
  totalSeats,
  price,
}) => {
  const isSoldOut = availableSeats === 0
  const isLowAvailability = availableSeats < totalSeats * 0.2
  const handleBookingClick = () => {
    if (!isLoggedIn) {
      alert('Please log in to book this event')
    } else if (!isSoldOut) {
      alert('Proceeding to payment...')
    }
  }
  if (isSoldOut) {
    return (
      <button
        disabled
        className="w-full py-3 px-4 bg-gray-300 text-gray-500 font-medium rounded-md cursor-not-allowed"
      >
        Sold Out
      </button>
    )
  }
  return (
    <button
      onClick={handleBookingClick}
      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
    >
      {isLoggedIn ? (
        <>
          {isFree ? 'Register Now' : `Book Now - $${price}`}
          {isLowAvailability && (
            <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
              Only {availableSeats} left
            </span>
          )}
        </>
      ) : (
        'Login to Book'
      )}
    </button>
  )
}
export default BookingButton
