import { Ticket } from "@/types/events";

export function getEventStatus(startTime: string, endTime: string): 'ongoing' | 'upcoming' | 'ended' {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
  
    if (now >= start && now <= end) {
      return 'ongoing';
    } else if (now < start) {
      return 'upcoming';
    } else {
      return 'ended';
    }
  }
  export const isNearbyWithUserLocation = async (
    targetLat: number,
    targetLng: number,
    radiusInKm: number = 5
  ): Promise<boolean> => {
    const toRad = (value: number) => (value * Math.PI) / 180;
  
    if (typeof window === "undefined" || !navigator.geolocation) {
      return false;
    }
  
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
  
          const R = 6371; 
          const dLat = toRad(targetLat - userLat);
          const dLng = toRad(targetLng - userLng);
  
          const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(userLat)) *
              Math.cos(toRad(targetLat)) *
              Math.sin(dLng / 2) ** 2;
  
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;
  
          resolve(distance <= radiusInKm);
        },
        () => {
          resolve(false); 
        }
      );
    });
  };

export const areAllTicketsBooked = (tickets : Ticket[]): boolean => {
    return tickets.every(ticket => ticket.totalBookedSeats >= ticket.totalSeats);
  };