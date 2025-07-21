import axios from "axios";

export default async function getUserInfo() {
    try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
            withCredentials: true,
        });
    } catch (error) {
        
    }
}

