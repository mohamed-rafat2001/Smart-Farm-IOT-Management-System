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

export default function dbConnect() {
	const dbUrl = getDbUrl();

	if (!dbUrl) {
		console.error("❌ Cannot connect to database: Invalid configuration");
		console.log("💡 Set DB_URL environment variable to connect to MongoDB");
		return;
	}

	console.log("🔄 Attempting to connect to MongoDB...");

	mongoose
		.connect(dbUrl, {
			// MongoDB connection options for serverless environments
			maxPoolSize: 1, // Limit connections for serverless
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
			bufferCommands: false,
			// Removed bufferMaxEntries as it's deprecated
		})
		.then(() => {
			console.log("✅ MongoDB connected successfully");
		})
		.catch((error) => {
			console.error("❌ MongoDB connection failed:", error.message);

			// Provide helpful error messages for common issues
			if (error.message.includes("ENOTFOUND")) {
				console.error(
					"💡 Tip: Check your MongoDB Atlas connection string and ensure the cluster is accessible"
				);
				console.error(
					"💡 Tip: Make sure your IP address is whitelisted in MongoDB Atlas"
				);
			} else if (error.message.includes("Authentication failed")) {
				console.error(
					"💡 Tip: Check your username and password in the connection string"
				);
			} else if (error.message.includes("ECONNREFUSED")) {
				console.error("💡 Tip: Check if your MongoDB Atlas cluster is running");
			}

			// Don't crash the server, just log the error
			console.log(
				"⚠️ Server will continue running without database connection"
			);
		});
}
