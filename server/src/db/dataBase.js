import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Simple MongoDB connection function
export default async function dbConnect() {
    try {
        // Get connection string and replace password placeholder
        let dbUrl = process.env.DB_URL;
        
        if (!dbUrl) {
            console.error("❌ DB_URL environment variable is not set");
            return false;
        }
        
        // Replace the password placeholder with actual password
        dbUrl = dbUrl.replace('<db_password>', process.env.DB_PASSWORD);
        
        console.log("🔄 Connecting to MongoDB...");
        
        // Set mongoose to use native promises
        mongoose.Promise = global.Promise;
        
        // Disable strict query
        mongoose.set('strictQuery', false);
        
        // Connect with minimal options and force IPv4
        await mongoose.connect(dbUrl, {
            family: 4, // Force IPv4
            connectTimeoutMS: 30000, // 30 seconds connection timeout
            socketTimeoutMS: 45000 // 45 seconds socket timeout
        });
        
        console.log(`✅ MongoDB connected successfully`);
        return true;
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        console.error("Error details:", error);
        return false;
    }
}
