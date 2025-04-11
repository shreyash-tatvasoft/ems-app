import { Category, EventData } from "@/types/events"
import {
    MusicIcon,
    PartyPopperIcon,
    UsersIcon,
    FilmIcon,
    LayoutGridIcon,
  } from 'lucide-react';
export const ROUTES = {
    LOGIN: "/login",
    SIGN_UP: "/sign-up",
    HOME: "/",
    USER_PROFILE: "/user/profile",
    ADMIN: {
        DASHBOARD: "/admin/dashboard",
        EVENTS: "/admin/event"
    }
}


export const ADMIN_SIDEBAR_ITEMS = [
    { id: 1, title: "Dashboard", route: ROUTES.ADMIN.DASHBOARD, icon: "/assets/DashboardIcon.svg" },
    { id: 2, title: "Events", route: ROUTES.ADMIN.EVENTS, icon: "/assets/EventsIcon.svg" },
]

export enum ROLE {
    Admin = "admin",
    User = "user",
}

export const EVENT_DATA : EventData[] = [
    {
      id: 1,
      title: 'Summer Music Festival 2023',
      description:
        'Join us for three days of amazing music featuring top artists from around the world. Experience unforgettable performances across multiple stages with food, drinks, and more!',
      image:
        '/music_featured_event.avif',
      date: 'Aug 25-27, 2023',
      time: '12:00 PM - 11:00 PM',
      location: 'Central Park, New York',
      priceRange: '$75 - $350',
      category: 'music',
    },
    {
      id: 2,
      title: 'Tech Conference 2023',
      description:
        'The biggest tech conference of the year with keynotes from industry leaders and workshops on the latest technologies.',
      image:
        '/tech_conference.avif',
      date: 'Sep 15-17, 2023',
      time: '9:00 AM - 6:00 PM',
      location: 'Convention Center, San Francisco',
      priceRange: '$250 - $1200',
      category: 'conference',
    },
    {
      id: 3,
      title: "New Year's Eve Party",
      description:
        'Ring in the new year with our spectacular celebration featuring live DJs, premium open bar, and midnight fireworks show.',
      image:
        '/pool_party.avif',
      date: 'Dec 31, 2023',
      time: '8:00 PM - 2:00 AM',
      location: 'Grand Hotel, Las Vegas',
      priceRange: '$150 - $500',
      category: 'party',
    },
    {
      id: 4,
      title: 'Film Festival 2023',
      description:
        'A week-long celebration of independent cinema featuring screenings, Q&As with directors, and networking events.',
      image:
        '/movie.avif',
      date: 'Oct 10-17, 2023',
      time: 'Various times',
      location: 'Downtown Cinema, Austin',
      priceRange: '$20 - $200',
      category: 'movie',
    },
    {
      id: 5,
      title: 'Food & Wine Festival',
      description:
        'Taste exquisite dishes and wine pairings from top chefs and vineyards around the world.',
      image:
        '/food_wine.avif',
      date: 'Sep 5-7, 2023',
      time: '11:00 AM - 8:00 PM',
      location: 'Waterfront Park, Chicago',
      priceRange: '$85 - $250',
      category: 'party',
    },
    {
      id: 6,
      title: 'Jazz Night',
      description:
        'An evening of smooth jazz featuring local and international jazz artists in an intimate setting.',
      image:
        '/jazz_night.avif',
      date: 'Aug 12, 2023',
      time: '7:00 PM - 11:00 PM',
      location: 'Blue Note Club, New Orleans',
      priceRange: '$40 - $75',
      category: 'music',
    },
    {
      id: 7,
      title: 'Marketing Summit',
      description:
        'Connect with marketing professionals and learn about the latest trends and strategies in digital marketing.',
      image:
        '/summt.avif',
      date: 'Oct 3-4, 2023',
      time: '9:00 AM - 5:00 PM',
      location: 'Business Center, Boston',
      priceRange: '$350 - $750',
      category: 'conference',
    },
    {
      id: 8,
      title: 'Summer Blockbuster Preview',
      description:
        'Exclusive early screenings of the most anticipated summer blockbuster films with special behind-the-scenes content.',
      image:
        '/cinema.avif',
      date: 'Jul 15, 2023',
      time: '6:00 PM - 10:00 PM',
      location: 'AMC Theater, Los Angeles',
      priceRange: '$15 - $25',
      category: 'movie',
    },
  ]
export const CATEGORIES : Category[] = [
    {
        id: 'all',
        name: 'All Events',
        icon: LayoutGridIcon,
      },
      {
        id: 'music',
        name: 'Music',
        icon: MusicIcon,
      },
      {
        id: 'party',
        name: 'Party',
        icon: PartyPopperIcon,
      },
      {
        id: 'conference',
        name: 'Conference',
        icon: UsersIcon,
      },
      {
        id: 'movie',
        name: 'Movie',
        icon: FilmIcon,
      },
]