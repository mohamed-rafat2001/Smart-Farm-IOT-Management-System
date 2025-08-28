import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Direct connection to MongoDB without complex logic
export default async function dbConnect() {
    try {
        // Simple connection string handling
        let dbUrl = process.env.DB_URL;
        const dbPassword = process.env.DB_PASSWORD;
        
        if (!dbUrl) {
            console.error("❌ DB_URL environment variable is not set");
            return false;
        }
        
        // Replace password placeholder if needed
        if (dbUrl.includes("<db_password>") && dbPassword) {
            dbUrl = dbUrl.replace("<db_password>", dbPassword);
        }
        
        // Simple connection options - only the essentials
        await mongoose.connect(dbUrl, {
            bufferCommands: true,
            bufferTimeoutMS: 60000,
            family: 4, // Force IPv4
            maxPoolSize: 10
        });
        
        console.log("✅ MongoDB connected successfully");
        return true;
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        return false;
    }
}
