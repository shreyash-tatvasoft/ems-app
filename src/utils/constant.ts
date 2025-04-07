export const ROUTES =  {
    LOGIN  : "/login",
    SIGN_UP : "/sign-up",
    HOME : "/",
    USER_PROFILE : "/user/profile",
    ADMIN : {
        DASHBOARD : "/admin/dashboard",
        EVENTS : "/admin/event"
    }
}


export const ADMIN_SIDEBAR_ITEMS = [
    { id : 1, title : "Dashboard", route : ROUTES.ADMIN.DASHBOARD, icon : "/assets/DashboardIcon.svg"},
    { id : 2, title : "Events", route : ROUTES.ADMIN.EVENTS, icon : "/assets/EventsIcon.svg"},
] 