import { LucideIcon } from "lucide-react";

export interface EventData {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
    time: string;
    location: string;
    priceRange: string;
    category: 'music' | 'conference' | 'party' | 'movie';
  }
  export interface Category {
    id: string;
    name: string;
    icon: LucideIcon;
  }
  