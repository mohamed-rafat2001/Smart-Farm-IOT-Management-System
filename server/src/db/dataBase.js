import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Create a singleton connection
let connectionInstance = null;

// Direct MongoDB connection with explicit connection options
export default async function dbConnect() {
    // If we already have a connection, return it
    if (connectionInstance && mongoose.connection.readyState === 1) {
        console.log("✅ Using existing MongoDB connection");
        return true;
    }

    try {
        // Get connection string
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
        
        console.log("🔄 Connecting to MongoDB...");
        
        // Disconnect any existing connection first
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log("🔄 Disconnected from previous MongoDB connection");
        }
        
        // Set mongoose to use native promises
        mongoose.Promise = global.Promise;
        
        // Disable strict query - helps with compatibility
        mongoose.set('strictQuery', false);
        
        // Connect with explicit options to address timeout issues
        // Only use options supported by the MongoDB driver
        connectionInstance = await mongoose.connect(dbUrl, {
            // Connection timeouts
            connectTimeoutMS: 60000,
            socketTimeoutMS: 60000,
            serverSelectionTimeoutMS: 60000,
            
            // Connection pool settings
            maxPoolSize: 10,
            minPoolSize: 2,
            
            // Force IPv4 (can help with some connection issues)
            family: 4
        });
        
        // Set up connection event listeners
        mongoose.connection.on('connected', () => {
            console.log('✅ MongoDB connection established');
        });
        
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB connection disconnected');
        });
        
        // Log connection state
        console.log(`✅ MongoDB connected successfully (${mongoose.connection.readyState === 1 ? 'connected' : 'not connected'})`);
        
        // Return connection state
        return mongoose.connection.readyState === 1;
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        console.error(error);
        return false;
    }
}
