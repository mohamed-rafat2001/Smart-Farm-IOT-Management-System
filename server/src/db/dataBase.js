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
		await mongoose.connect(dbUrl, {
			maxPoolSize: 1,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
			bufferCommands: false,
		});
		isConnected = true;
		console.log("✅ MongoDB connected successfully");
	} catch (error) {
		console.error("❌ MongoDB connection failed:", error.message);
	}
}
