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
