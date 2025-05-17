import axios from "axios";
const API_URL = "http://localhost:3000/user";
interface UserData {
  email: string,
  password: string,
  confirmPassword?:string
}

interface Credentials{
  email: String,
  password:string
}

// register user
export const registerUser = async (userData: UserData):Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error registering user:", err);
    throw err;
  }
};
export const loginUser = async (credentials:Credentials):Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      withCredentials: true // This is important for cookies
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error logging in:", err);
    throw err;
  }
};
export const logout = ():void => {
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
