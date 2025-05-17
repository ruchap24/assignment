import axios from "axios";

// Precise API configuration
const API_BASE_URL = "http://localhost:5000";
const API_URL = `${API_BASE_URL}/user`;

// Enhanced axios client
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Detailed error logging interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error("Detailed API Error:", {
      response: error.response,
      request: error.request,
      message: error.message,
      config: error.config
    });
    return Promise.reject(error);
  }
);

interface UserData {
  email: string,
  password: string,
  confirmPassword?:string
}

interface Credentials{
  email: String,
  password:string
}

// Registration API call with comprehensive error handling
export const registerUser = async (userData: UserData): Promise<any> => {
  try {
    console.log("Registration Request Payload:", userData);
    
    // CRITICAL: Ensure correct endpoint
    const response = await apiClient.post('/user/register', userData);
    
    console.log("Registration Successful Response:", response.data);
    return response.data;
  } catch (err: any) {
    console.error("Registration API Error:", {
      errorResponse: err.response?.data,
      errorStatus: err.response?.status,
      errorMessage: err.message
    });

    // Throw a more informative error
    if (err.response) {
      throw new Error(
        err.response.data.message || 
        'Registration failed. Please try again.'
      );
    } else if (err.request) {
      throw new Error('No response received from server. Check your connection.');
    } else {
      throw new Error('Error preparing registration request.');
    }
  }
};export const loginUser = async (credentials:Credentials):Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      withCredentials: true // Ensure cookies are sent
    });
    return response.data;
  } catch (err: any) {
    console.error("Error logging in:", err.response?.data || err.message);
    throw err;
  }
};export const logout = ():void => {
  // Remove the token from the cookie
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Remove the token from Axios headers
  delete axios.defaults.headers.common["Authorization"];

  // Redirect to the login page

}
export const getAllUsers = async(token:string):Promise<any>=>{
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers:{Authorization:`Bearer ${token}`}
        })
        return response.data
    } catch (err) {
        console.error('Error fetching users:', err)
        throw err        
    }
}
