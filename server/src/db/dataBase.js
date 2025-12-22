import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbUrl = (process.env.DB_URL || "").replace(
	"<db_password>",
	process.env.DB_PASSWORD || ""
);
export default async function dbConnect() {
	if (mongoose.connection.readyState >= 1) {
		console.log("✅ Using existing database connection");
		return;
	}

	try {
		console.log("🔌 Attempting to connect to database...");
		if (!process.env.DB_URL) {
			throw new Error("❌ DB_URL environment variable is missing!");
		}

		const safeDbUrl = dbUrl.replace(/:([^:@]+)@/, ":****@");
		console.log(`📡 Connection URL: ${safeDbUrl}`);

		await mongoose.connect(dbUrl, {
			serverSelectionTimeoutMS: 30000, // 30 seconds to find a server
			socketTimeoutMS: 120000, // 2 minutes of socket inactivity before timeout
		});
		console.log("✅ Database storage connected successfully");
	} catch (e) {
		console.error("❌ Database connection error:", e.message);
		throw e; // Re-throw so the caller knows it failed
	}
}
