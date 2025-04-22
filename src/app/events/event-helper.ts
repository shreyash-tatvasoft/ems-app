import { EventData, Ticket } from "@/types/events";
import { EventDataObjResponse, EventResponse, IApplyFiltersKey } from "@/utils/types";
import { LabelValue } from "./types";
import { durationOptions, STATUS_OPTIONS, TICKETS_OPTIONS } from "@/utils/constant";

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

export const getSimilarEvents = (events:EventDataObjResponse[] | null,currentEventId :string) => {
if(events){
    const currentEvent = events.find(event => event._id === currentEventId);
if (!currentEvent) return [];
return events
    .filter(event => event.category === currentEvent.category && event._id !== currentEventId)
    .slice(0, 3); 
}
};

export const getTicketStatus = (ticket: Ticket): {
  status: 'Available' | 'Filling Fast' | 'Almost Full' | 'Sold Out';
  color: 'green' | 'yellow' | 'red' | 'gray';
} => {
  const availableSeats = ticket.totalSeats - ticket.totalBookedSeats;
  const ratio = availableSeats / ticket.totalSeats;

  if (availableSeats <= 0) {
    return { status: 'Sold Out', color: 'gray' };
  } else if (ratio > 0.5) {
    return { status: 'Available', color: 'green' };
  } else if (ratio > 0.2) {
    return { status: 'Filling Fast', color: 'yellow' };
  } else {
    return { status: 'Almost Full', color: 'red' };
  }
};

export const convertToSubCurrency=(amount:number,factor:100)=>{
  return Math.round(amount * factor)
}

export const convertFiltersToArray = (filters: IApplyFiltersKey): LabelValue[] => {
  const result: LabelValue[] = [];

  const { catogories, durations, status, ticketsTypes, eventsDates, priceRange  } = filters

  if (catogories && catogories.length) {
    catogories.forEach((cat) =>
      result.push({ label: cat, value: cat, rowKey: "catogories" })
    );
  }

  if (durations && durations.length) {
    durations.forEach((duration) => {
      const durationLable = durationOptions.filter(item => item.value === duration).map(item => item.label)
      return result.push({ label: durationLable.toString(), value: duration, rowKey: "durations" })
    }
    );
  }

  if (status) {
    const statusLabel = STATUS_OPTIONS.filter(item => item.value === status).map(item => item.label)
    result.push({ label: statusLabel.toString(), value: status, rowKey: "status" });
  }

  if (ticketsTypes) {
    const ticketLablel = TICKETS_OPTIONS.filter(item => item.value === ticketsTypes).map(item => item.label)
    result.push({ label: ticketLablel.toString(), value: ticketsTypes, rowKey : "ticketsTypes" });
  }

  // if (eventsDates) {
  //   result.push({
  //     label: "Event Date",
  //     value: `${eventsDates.startDate} to ${eventsDates.endDate}`,
  //   });
  // }

  // if (priceRange) {
  //   result.push({
  //     label: "Price",
  //     value: `${priceRange.min} - ${priceRange.max}`,
  //   });
  // }

  return result;
};

export const removeFilterFromObject = (
  key: keyof IApplyFiltersKey,
  valueToRemove: string,
  currentFilters: IApplyFiltersKey
): IApplyFiltersKey => {
  const updatedFilters: IApplyFiltersKey = { ...currentFilters };

  const currentValue = updatedFilters[key];

  // Handle array values (e.g., catogories, durations)
  if (Array.isArray(currentValue)) {
    const filteredArray = currentValue.filter(item => item !== valueToRemove);
    if (filteredArray.length > 0) {
      updatedFilters[key] = filteredArray as any;
    } else {
      delete updatedFilters[key];
    }
  }

  // Handle primitive string values
  else if (typeof currentValue === 'string') {
    if (currentValue === valueToRemove) {
      delete updatedFilters[key];
    }
  }

  // Handle object values (optional: extend this logic as needed)
  // else if (typeof currentValue === 'object' && currentValue !== null) {
  //   // Example: remove eventsDates if both fields are empty
  //   if (key === 'eventsDates') {
  //     const { from, to } = currentValue as IEventRangeDate;
  //     if (from === valueToRemove || to === valueToRemove) {
  //       delete updatedFilters[key];
  //     }
  //   }

  //   if (key === 'priceRange') {
  //     const { min, max } = currentValue as IEventPrice;
  //     if (`${min}` === valueToRemove || `${max}` === valueToRemove) {
  //       delete updatedFilters[key];
  //     }
  //   }
  // }

  return updatedFilters;
};
