import mongoose from "mongoose";
import "dotenv/config";

const connectDb = async () => {
    try {
        const res = await mongoose.connect(process.env.DB_URL);
        
    } catch (error) {
        
    }
}

export {connectDb};