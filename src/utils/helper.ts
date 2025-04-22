
export const getAuthToken = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token") || ""
  return token
}