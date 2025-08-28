import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Handle database connection with proper error handling
const getDbUrl = () => {
	const dbUrl = process.env.DB_URL;
	const dbPassword = process.env.DB_PASSWORD;

	if (!dbUrl) {
		console.error("❌ DB_URL environment variable is not set");
		return null;
	}

	// If the connection string contains <db_password> placeholder, replace it
	if (dbUrl.includes("<db_password>")) {
		if (!dbPassword) {
			console.error(
				"❌ DB_PASSWORD environment variable is required when using <db_password> placeholder"
			);
			return null;
		}
		return dbUrl.replace("<db_password>", dbPassword);
	}

	// If no placeholder, use the connection string as is
	return dbUrl;
};
let isConnected = false;
export default async function dbConnect() {
	if (isConnected) return;
	const dbUrl = getDbUrl();
	if (!dbUrl) {
		console.error("❌ Cannot connect to database: Invalid configuration");
		return;
	}
	try {
		// Add connection options with increased timeouts and keepAlive
		await mongoose.connect(dbUrl, {
			serverSelectionTimeoutMS: 30000, // Increase from default 30s to 30s (can increase further if needed)
			socketTimeoutMS: 45000, // Increase socket timeout
			connectTimeoutMS: 30000, // Connection timeout
			keepAlive: true,
			keepAliveInitialDelay: 300000 // 5 minutes
		});
		isConnected = true;
		console.log("✅ MongoDB connected successfully");
	} catch (error) {
		console.error("❌ MongoDB connection failed:", error.message);
		// Log more detailed error information
		if (error.name === 'MongooseServerSelectionError') {
			console.error("❌ Server selection timed out. Check network connectivity to MongoDB Atlas.");
		}
	}
}
