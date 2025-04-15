import { LucideIcon } from "lucide-react";
export type EventStatus = 'ongoing' | 'ended' | 'upcoming';
export type EventCategory = 'Music' | 'all' | 'Film & Media' | 'Food & Drink' | 'Sports' | 'Art & Culture' | 'Business' | 'Wellness' | 'Education' | 'Gaming';
export type SortOption = 'none' | 'date-asc' | 'date-desc' | 'title-asc' | 'title-desc';
export interface EventData {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  priceRange: string;
  category: EventCategory | string;
  isSoldOut: boolean;
  isLiked: boolean;
  status: EventStatus;
  isFeatured: boolean;
}
  export interface Category {
    id: string;
    name: string;
    icon: LucideIcon;
  }
  export interface Ticket {
    type: string;
    price: number;
    totalSeats: number;
    totalBookedSeats: number;
    description: string;
    _id: string;
  }