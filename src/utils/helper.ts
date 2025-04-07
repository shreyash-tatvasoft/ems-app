export const getAuthToken = () => {
    const token = localStorage.getItem("authToken")
    return token ? token : ""
}