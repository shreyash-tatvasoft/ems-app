export const getAuthToken = () => {
    const token = localStorage.getItem("authToken")
    return token ? token : ""
}

type ApiParams = {
    endPoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: string | FormData;
    headers?: HeadersInit;
  };
  
  export const apiCall = async ({ endPoint, method = 'GET', body, headers = {} }: ApiParams) => {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      };
  
      if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
      }
  
     return await fetch(endPoint, options);
  
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };
  