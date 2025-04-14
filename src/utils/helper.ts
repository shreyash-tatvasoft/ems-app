import { ApiParams } from "./interfaces";

export const getAuthToken = () => {
    const token = localStorage.getItem("token")
    return token ? token : ""
}
 
  export const apiCall = async ({ endPoint, method = 'GET', body, headers = {} }: ApiParams) => {
    try {
      const options: RequestInit = {
        method,
        headers: {
          ...headers,
        },
      };
  
      if (body && method !== 'GET') {
        options.body = body;
      }
  
     return await fetch(endPoint, options);
  
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };
  