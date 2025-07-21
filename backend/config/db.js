import mongoose from "mongoose";
import "dotenv/config";

const connectDb = async () => {
    try {
        const res = await mongoose.connect(process.env.DB_URL);
        console.log(`Connected Succesfully To Database`);
    } catch (error) {
        console.log("Can Not Connect To Database" + error.message);
    }
}

export {connectDb};