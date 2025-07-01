import axios from "axios";
import userContext from "../context/UserContext";

export default async function getUserInfo() {
    try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
            withCredentials: true,
            
        });
    console.log("Start Getting The User");        
    } catch (error) {
        console.log(error);
    }
}

