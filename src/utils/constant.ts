export const ROUTES = {
    LOGIN: "/login",
    SIGN_UP: "/sign-up",
    HOME: "/",
    USER_EVENTS: "/events",
    USER_EVENTS_DETAILS: "/events/*",
    USER_PROFILE: "/user/profile",
    ADMIN: {
        DASHBOARD: "/admin/dashboard",
        EVENTS: "/admin/event",
        CREATE_EVENT: "/admin/event/create",
    },
    RESET_PASSWORD: "/reset-password"
}

export const API_ROUTES = {
    ADMIN: {
        CREATE_EVENT: `/events`,
        GET_EVENTS: `/events`,
        DELETE_EVENT: (id: string) => `/events/${id}`,
        SHOW_EVENT: (id: string) => `/events/${id}`,
        UPDATE_EVENT: (id: string) => `/events/${id}`,
        // DASHBOARD
        DASHBOARD_OVERVIEW: 'dashboard/analytics/dashboard-overview',
        TOP_LIKED_EVENTS: 'dashboard/analytics/top-liked-events',
        BOOKING_BY_TICKET_TYPE: 'dashboard/analytics/bookings-by-ticket-type',
        REVENUE_OVER_TIME: 'dashboard/analytics/total-revenue',
        REVENUE_BY_CATEGORY: 'dashboard/analytics/average-booking-value',
        TOP_USERS_HIGHEST_BOOKING: 'dashboard/analytics/repeat-customers',
        BOOKING_BY_MONTH_DATE: 'dashboard/analytics/bookings-time-trends',
        TOP_REVENUE_BY_EVENTS: 'dashboard/analytics/top-revenue-events',
    },
    AUTH: {
        LOGIN: `/login`,
        SIGNUP: `/signup`,
        FORGOT_PASSWORD: `/forgot_password`,
        RESET_PASSWORD:`/reset_password`
    },
    EVENT:{
      PAYMENT:`/ticket/book`
    }
}
export const LIGHT_COLORS = [
    '#FFB3BA', // Light Red
    '#D5F4E6', // Mint
    '#FFFACD', // Lemon Chiffon
    '#FADADD', // Light Pink
    '#C1F0F6', // Pale Cyan
    '#FFDFBA', // Light Orange
    '#FFFFBA', // Light Yellow
    '#BAFFC9', // Light Green
    '#BAE1FF', // Light Blue
    '#E0BBE4', // Light Purple
];

export const DARK_COLORS = [
    '#4B0082', // Indigo
    '#2F4F4F', // Dark Slate Gray
    '#800000', // Maroon
    '#003366', // Dark Blue
    '#5C4033', // Dark Brown
    '#1C1C1C', // Almost Black
    '#4B5320', // Army Green
    '#2C2C54', // Dark Purple
    '#3B3B98', // Space Blue
    '#0B3D91', // Navy Blue
];
export const BALANCED_COLORS = [
    '#90B4ED', // Sky Blue
    '#FF8C94', // Soft Coral
    '#FDCB82', // Warm Peach
    '#A3DE83', // Fresh Green
    '#F48FB1', // Rosy Pink
    '#85D2D0', // Cool Aqua
    '#FFD972', // Soft Amber
    '#B39CD0', // Soft Purple
    '#FFAB91', // Melon
    '#D1C4E9', // Lavender Gray
];

export const ADMIN_SIDEBAR_ITEMS = [
    { id: 1, title: "Dashboard", route: ROUTES.ADMIN.DASHBOARD, icon: "/assets/DashboardIcon.svg" },
    { id: 2, title: "Events", route: ROUTES.ADMIN.EVENTS, icon: "/assets/EventsIcon.svg" },
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

export const SIGN_UP_IMAGE_BANNER_LINK = "https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?semt=ais_hybrid&w=740"
export const LOG_IN_IMAGE_BANNER_LINK = "https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-2242.jpg?semt=ais_hybrid&w=740"

export enum ROLE {
    Admin = "admin",
    User = "user",
}

export const INITIAL_TICKETS_TYPES = [
    { id: "1", type: "Premium", price: "300", maxQty: 100, description: "All access, Goodies" },
    { id: "2", type: "Standard", price: "150", maxQty: 50, description: "Front row, extra access" },
    { id: "3", type: "Free", price: "0", maxQty: 50, description: "General admission" },
]

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;

export const AUTOCOMPLETE_API = (debouncedQuery: string) => `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(
    debouncedQuery
)}&format=json&limit=5`


export const ALLOWED_FILE_FORMATS = ["jpg", "jpeg", "png", "webp"];
export const MAX_FILE_SIZE_MB = 2;

export const PAGINATION_OPTIONS = [
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
];

export const LOCATION_OPTIONS = [
  { value: "5", label: '0 km - 5 km' },
  { value: "10", label: '5 km - 10 km' },
  { value: "25", label: 'upto 25 km' },
  { value: "50", label: 'upto 50 km' },
];

export const durationOptions = [
    { label: "Short - Less than 1 hour", value: "short" },
    { label: "Medium - 1 to 4 hours", value: "medium" },
    { label: "Long - 4 to 12 hours", value: "long" },
    { label: "Full Day - 12 to 24 hours", value: "fullDay" },
    { label: "Multi-Day - More than 1 day", value: "multiDay" },
]

export const CATOGORIES_ITEMS_ARRAY = [
    { id: 1, label: "Music", value: "Music" },
    { id: 2, label: "Art & Culture", value: "Art & Culture" },
    { id: 3, label: "Film & Media", value: "Film & Media" },
    { id: 4, label: "Education", value: "Education" },
    { id: 5, label: "Sports", value: "Sports" },
    { id: 6, label: "Food & Drink", value: "Food & Drink" },
    { id: 7, label: "Wellness", value: "Wellness" },
    { id: 8, label: "Gaming", value: "Gaming" },
    { id: 9, label: "Business", value: "Business" },
]

export const STATUS_OPTIONS = [
    { label: "Upcoming", value: "upcoming" },
    { label: "Ongoing", value: "ongoing" },
    { label: "Ended", value: "ended" }
]

export const TICKETS_OPTIONS = [
    { label: "Available", value: "available", colorKey: "green" },
    { label: "Filling Fast", value: "fastFilling", colorKey: "yellow" },
    { label: "Almost Full", value: "almostFull", colorKey: "red" },
    { label: "Sold Out", value: "soldOut", colorKey: "gray" }
]

export const PROFILE_TAB_OPTIONS = [
    { id: 1, value: "personal", label: "Personal Information" },
    { id: 2, value: "email", label: "Update Email Address" },
    { id: 3, value: "password", label: "Change Password" },
]

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
import { Category } from './types'

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