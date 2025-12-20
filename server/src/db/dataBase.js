import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbUrl = process.env.DB_URL.replace(
	"<db_password>",
	process.env.DB_PASSWORD
);
export default function dbConnect() {
	mongoose
		.connect(dbUrl, {
			serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
			socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
		})
		.then(() => {
			console.log("db is connbected");
		})
		.catch((e) => {
			console.log(e.message);
		});
}
