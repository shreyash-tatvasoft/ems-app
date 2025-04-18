import { EventsDataTypes, EventTicket, IApplyFiltersKey } from "@/utils/types";
import { IEventFormData } from "./types";
import moment from "moment";

export const getTicketPriceRange = (data: EventTicket[]) => {
    const prices = data.map((ticket) => ticket.price);

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const priceRange =
        minPrice === 0
            ? `${maxPrice === 0 ? "Free" : `Free - ${maxPrice}`}`
            : minPrice === maxPrice
                ? `${minPrice}`
                : `${minPrice} - ${maxPrice}`;
    return priceRange
};

export const getStatus = (startDate: string, endDate: string, tickets: number) => {
    const now = moment();
    const start = moment(startDate);
    const end = moment(endDate);

    if (tickets === 0) return "Sold Out";
    if (now.isBefore(start)) return "Upcoming";
    if (now.isAfter(end)) return "Ended";
    return "Ongoing";
};

export const InitialEventFormDataValues: IEventFormData = {
    title: "",
    description: "",
    location: {
        address: "",
        lat: 0,
        long: 0,
    },
    start_time: null,
    end_time: null,
    duration: "",
    category: null,
    ticket_type: [
        {
            type: "",
            price: "",
            max_qty: "",
            description: "",
        },
    ],
    images: [],
}

export const InitialEventFormDataErrorTypes = {
    title: false,
    description: false,
    location: false,
    start_time: false,
    end_time: false,
    duration: false,
    category: false,
    ticket_type: false,
    images: false,
};

export const sortEvents = (
    events: EventsDataTypes[],
    key: keyof Omit<EventsDataTypes, "img"> | "status",
    order: "asc" | "desc" = "asc"
): EventsDataTypes[] => {
    const parseDurationToMinutes = (duration: string): number => {
        const regex = /(\d+)\s*(day|days|hr|hrs|hour|hours|min|minutes)/gi;
        let totalMinutes = 0;

        let match: RegExpExecArray | null;
        while ((match = regex.exec(duration)) !== null) {
            const value = parseInt(match[1]);
            const unit = match[2].toLowerCase();

            if (unit.includes("day")) totalMinutes += value * 24 * 60;
            else if (unit.includes("hr") || unit.includes("hour")) totalMinutes += value * 60;
            else if (unit.includes("min")) totalMinutes += value;
        }

        return totalMinutes;
    };

    const priceRangeDiff = (price: string): number => {
        const cleaned = price.toLowerCase().replace("free", "0");
        const [minStr, maxStr] = cleaned.split("-").map(p => p.trim());
        const min = parseInt(minStr) || 0;
        const max = parseInt(maxStr) || 0;
        return Math.abs(max - min);
    };

    return [...events].sort((a, b) => {
        let valA: any = a[key as keyof EventsDataTypes];
        let valB: any = b[key as keyof EventsDataTypes];

        if (key === "status") {
            valA = getStatus(a.startTime, a.endTime, a.ticketsAvailable);
            valB = getStatus(b.startTime, b.endTime, b.ticketsAvailable);
        }

        if (key === "startTime" || key === "endTime") {
            valA = new Date(valA).getTime();
            valB = new Date(valB).getTime();
        }

        if (key === "ticketsAvailable") {
            valA = Number(valA);
            valB = Number(valB);
        }

        if (key === "price") {
            valA = priceRangeDiff(valA as string);
            valB = priceRangeDiff(valB as string);
        }

        if (key === "duration") {
            valA = parseDurationToMinutes(valA as string);
            valB = parseDurationToMinutes(valB as string);
        }

        if (typeof valA === "string" && typeof valB === "string") {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
        }

        if (valA < valB) return order === "asc" ? -1 : 1;
        if (valA > valB) return order === "asc" ? 1 : -1;
        return 0;
    });
};

export const filterByCatogories = (events: EventsDataTypes[], catogoeriesArray : string[]) => {
  return events.filter(event => catogoeriesArray.includes(event.category))
}

export const filterByDuration = (
    events: EventsDataTypes[],
    selectedDurations: string[]
): EventsDataTypes[] => {

    return events.filter(event => {
        const start = moment(event.startTime)
        const end = moment(event.endTime)
        const durationInMinutes = end.diff(start, "minutes")

        return selectedDurations.some(duration => {
            switch (duration) {
                case "short":
                    return durationInMinutes < 60
                case "medium":
                    return durationInMinutes >= 60 && durationInMinutes <= 240
                case "long":
                    return durationInMinutes > 240 && durationInMinutes <= 720
                case "fullDay":
                    return durationInMinutes > 720 && durationInMinutes <= 1440
                case "multiDay":
                    return durationInMinutes > 1440
                default:
                    return false
            }
        })
    })
}

export const filterByStatus = (
    events: EventsDataTypes[],
    status: string
): EventsDataTypes[] => {

    const now = moment()

    return events.filter(event => {
        const start = moment(event.startTime)
        const end = moment(event.endTime)

        switch (status) {
            case "upcoming":
                return start.isAfter(now)
            case "ongoing":
                return now.isBetween(start, end)
            case "ended":
                return end.isBefore(now)
            default:
                return false
        }
    })
}

export const filterByTicketsAvailability = (
    events: EventsDataTypes[],
    ticketType: string // one of: "available" | "fastFilling" | "almostFull" | "soldOut"
): EventsDataTypes[] => {

    return events.filter(event => {
        const { ticketsAvailable, totalTickets } = event
        if (!totalTickets || totalTickets === 0) return false

        const percentageAvailable = (ticketsAvailable / totalTickets) * 100

        switch (ticketType) {
            case "available":
                return percentageAvailable > 50
            case "fastFilling":
                return percentageAvailable > 20 && percentageAvailable <= 50
            case "almostFull":
                return percentageAvailable > 0 && percentageAvailable <= 20
            case "soldOut":
                return ticketsAvailable === 0
            default:
                return false
        }
    })
}

export const getFilteredData = (events: EventsDataTypes[], filterValues : IApplyFiltersKey) => {
    let data = [...events]
    let activeFiltersKey = 0

    const { catogories, durations, status, ticketsTypes } = filterValues

    if(catogories && catogories.length > 0) {
        data = filterByCatogories(data, catogories)
        activeFiltersKey = activeFiltersKey + 1
    }
    if(durations && durations.length > 0) {
        data = filterByDuration(data, durations)
        activeFiltersKey = activeFiltersKey + 1
    }

    if(status && status.trim() !== "") {
        data = filterByStatus(data, status)
        activeFiltersKey = activeFiltersKey + 1
    }

    if(ticketsTypes && ticketsTypes.trim() !== "") {
        data = filterByTicketsAvailability(data, ticketsTypes)
        activeFiltersKey = activeFiltersKey + 1
    }

    return {data , filterCount : activeFiltersKey}
}