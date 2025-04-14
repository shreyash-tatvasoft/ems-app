// Delete Modal Props Start here

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  loading?: boolean
}

// Delete Modal Props End here


// Api params Start here
export type ApiParams = {
  endPoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: string | FormData;
  headers?: HeadersInit;
};
// Api params End here


// Event Response Types Start here
export interface EventsDataTypes {
  id: string
  img: string;
  title: string;
  category: string;
  startTime: string;
  duration: string;
  location: string;
  price: string | number;
  ticketsAvailable: number;
}


export type EventLocation = {
  address: string;
  lat: number;
  lng: number;
};

export type EventTicket = {
  _id: string;
  type: string;
  price: number;
  totalSeats: number,
  totalBookedSeats: number,
  description: string;
};

export type EventImage = {
  _id: string;
  imageId: string;
  url: string;
};

export type EventDataObjResponse = {
  _id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  startDateTime: string; // ISO string
  endDateTime: string;   // ISO string
  location: EventLocation;
  tickets: EventTicket[];
  images: EventImage[]; // optional, since second object has no images
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export type EventResponse = EventDataObjResponse[];

// Event Response Types End here
