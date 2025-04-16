export const ROUTES = {
  LOGIN: "/login",
  SIGN_UP: "/sign-up",
  HOME: "/",
  USER_EVENTS: "/events",
  USER_PROFILE: "/user/profile",
  ADMIN: {
      DASHBOARD: "/admin/dashboard",
      EVENTS: "/admin/event",
      CREATE_EVENT : "/admin/event/create",
  }
}

export const ADMIN_SIDEBAR_ITEMS = [
  { id : 1, title : "Dashboard", route : ROUTES.ADMIN.DASHBOARD, icon : "/assets/DashboardIcon.svg"},
  { id : 2, title : "Events", route : ROUTES.ADMIN.EVENTS, icon : "/assets/EventsIcon.svg"},
] 

export const CATOGORIES_ITEMS = [
  { id: 1, label: "Music", value: "Music", icon: "🎵" },
  { id: 2, label: "Art & Culture", value: "Art & Culture", icon: "🎨" },
  { id: 3, label: "Film & Media", value: "Film & Media", icon: "🎬" },
  { id: 4, label: "Education", value: "Education", icon: "🎓" },
  { id: 5, label: "Sports", value: "Sports", icon: "🏅" },
  { id: 6, label: "Food & Drink", value: "Food & Drink", icon: "🍔" },
  { id: 7, label: "Wellness", value: "Wellness", icon: "🧘" },
  { id: 8, label: "Gaming", value: "Gaming", icon: "🎮" },
  { id: 9, label: "Business", value: "Business", icon: "💼" },
]

export enum ROLE {
  Admin = "admin",
  User = "user",
}

export const INITIAL_TICKETS_TYPES = [
  { id: "1", type: "Premium", price: "300", maxQty: 100, description: "All access, Goodies" },
  { id: "2", type: "Standard", price: "150", maxQty: 50, description: "Front row, extra access" },
  { id: "3", type: "Free", price: "0", maxQty: 50, description: "General admission" },
]

export const API_TYPES = {
  GET : "GET",
  POST : "POST",
  DELETE : "DELETE",
  PUT : "PUT",
  PATCH: "PATCH"
}

export const BE_URL = "https://event-management-system-5zdg.onrender.com"

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;

export const AUTOCOMPLETE_API = (debouncedQuery: string) => `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(
    debouncedQuery
)}&format=json&limit=5`


export const API_ROUTES = {
    ADMIN: {
        CREATE_EVENT: `${BE_URL}/events`,
        GET_EVENTS: `${BE_URL}/events`,
        DELETE_EVENT: (id: string) => `${BE_URL}/events/${id}`,
        SHOW_EVENT: (id: string) => `${BE_URL}/events/${id}`,
        UPDATE_EVENT: (id: string) => `${BE_URL}/events/${id}`
    },
    AUTH: {
        LOGIN: `${BE_URL}/login`,
        SIGNUP: `${BE_URL}/signup`,
    }
}


export const ALLOWED_FILE_FORMATS = ["jpg", "jpeg", "png", "webp"];
export const MAX_FILE_SIZE_MB = 2;

export const PAGINATION_OPTIONS = [
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
];

import {
    MusicIcon,
    PartyPopperIcon,
    UsersIcon,
    FilmIcon,
    LayoutGridIcon,
    Gamepad2,
    GraduationCap,
    BriefcaseMedical,
    Medal,
    Utensils,
} from 'lucide-react';
import { Category, EventData } from './types'

export const CATEGORIES: Category[] = [
    {
        id: 'all',
        name: 'All Events',
        icon: LayoutGridIcon,
    },
    {
        id: 'Music',
        name: 'Music',
        icon: MusicIcon,
      },
      {
        id: 'Art & Culture',
        name: 'Art & Culture',
        icon: PartyPopperIcon,
    },
    {
        id: 'Business',
        name: 'Business',
        icon: UsersIcon,
    },
    {
        id: 'Film & Media',
        name: 'Film & Media',
        icon: FilmIcon,
    },
      {
        id: 'Gaming',
        name: 'Gaming',
        icon: Gamepad2,
      },
      {
        id: 'Education',
        name: 'Education',
        icon: GraduationCap,
      },
      {
        id: 'Wellness',
        name: 'Wellness',
        icon: BriefcaseMedical,
      },
      {
        id: 'Food & Drink',
        name: 'Food & Drink',
        icon: Utensils,
      },
      {
        id: 'Sports',
        name: 'Sports',
        icon: Medal,
      },
]