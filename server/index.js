import dotenv from "dotenv";
import { app } from "./src/app.js";
import dbConnect from "./src/db/dataBase.js";

dotenv.config();

// Connect to database and start server
(async () => {
	try {
		console.log("🚀 Starting server initialization...");
		console.log("📁 Current directory:", process.cwd());
		console.log("🔧 Node version:", process.version);
		console.log("🌐 Environment:", process.env.NODE_ENV);

		const port = process.env.PORT || 3000;
		await dbConnect();
		console.log("✅ Database connection successful");

		app.listen(port, () => {
			console.log(`✅ Server is running on port ${port}`);
		});
	} catch (error) {
		console.error("❌ CRITICAL ERROR: Failed to start server:", error);
		console.error("Stack trace:", error.stack);
		setTimeout(() => process.exit(1), 1000);
	}
})();

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
	console.error("� UNHANDLED REJECTION! Shutting down...");
	console.error(err.name, err.message, err.stack);
	setTimeout(() => process.exit(1), 1000);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
	console.error("💥 UNCAUGHT EXCEPTION! Shutting down...");
	console.error(err.name, err.message, err.stack);
	setTimeout(() => process.exit(1), 1000);
});

// Export app for Vercel
export default app;
