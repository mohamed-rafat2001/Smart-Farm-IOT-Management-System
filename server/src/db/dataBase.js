import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbUrl = (process.env.DB_URL || "").replace(
	"<db_password>",
	process.env.DB_PASSWORD || ""
);
export default function dbConnect() {
	if (mongoose.connection.readyState >= 1) {
		console.log("✅ Using existing database connection");
		return;
	}

	mongoose
		.connect(dbUrl, {
			serverSelectionTimeoutMS: 30000, // 30 seconds to find a server
			socketTimeoutMS: 120000, // 2 minutes of socket inactivity before timeout
		})
		.then(() => {
			console.log("✅ Database storage connected successfully");
		})
		.catch((e) => {
			console.error("❌ Database connection error:", e.message);
		});
}
