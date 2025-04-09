export type TicketType = {
    type: string;
    price: string;
    max_qty: string;
    description: string;
};

export type EventLocation = {
    address: string;
    lat: string;
    long: string;
};

export type EventFormData = {
    title: string;
    description: string;
    location: EventLocation;
    start_time: string;
    end_time: string;
    duration: string;
    category: string;
    ticket_type: TicketType[];
    images: File[];
};

export type EventFormDataErrorTypes = {
    title: boolean;
    description: boolean;
    location: boolean;
    start_time: boolean;
    end_time: boolean;
    duration: boolean;
    category: boolean;
    ticket_type: boolean;
    images: boolean;
};


export const InitialEventFormDataValues : EventFormData = {
        title: "",
        description: "",
        location: {
          address: "",
          lat: "",
          long: "",
        },
        start_time: "",
        end_time: "",
        duration: "",
        category: "",
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


export type Ticket = {
  id: string;
  type: string;
  price: string;
  maxQty: number;
  description: string;
  isEditing?: boolean;
};