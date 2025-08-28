import express from "express";
import dotenv from "dotenv";

// Load environment variables first
dotenv.config();

// Create a basic error handler app
const createErrorApp = (error) => {
	const app = express();
	app.use(express.json());

	app.get("*", (req, res) => {
		res.status(500).json({
			status: "error",
			message: "Server initialization failed",
			error: error.message,
			timestamp: new Date().toISOString(),
			env: {
				hasDbUrl: !!process.env.DB_URL,
				hasJwtKey: !!process.env.JWTKEY,
				nodeEnv: process.env.MODE,
			},
		});
	});

	return app;
};

// Try to import and initialize the main app
let app;
try {
	// Import the main app
	const { app: mainApp } = await import("./src/app.js");
	app = mainApp;

	console.log("✅ Server initialized successfully");
} catch (error) {
	console.error("❌ Failed to initialize main app:", error);
	app = createErrorApp(error);
}

// Global error handlers
process.on("uncaughtException", (err) => {
	console.error("❌ Uncaught Exception:", err);
	// Don't exit in serverless environment
	if (process.env.MODE !== "production") {
		process.exit(1);
	}
});

process.on("unhandledRejection", (err) => {
	console.error("❌ Unhandled Rejection:", err);
	// Don't exit in serverless environment
	if (process.env.MODE !== "production") {
		process.exit(1);
	}
});

const port = process.env.PORT || 3000;

// Local development server
if (process.env.MODE !== "production") {
	const server = app.listen(port, () => {
		console.log(`🚀 Server running on port ${port}`);
	});

	process.on("unhandledRejection", (err) => {
		console.error("❌ Unhandled Rejection:", err);
		server.close(() => {
			process.exit(1);
		});
	});
}

// Export for Vercel serverless functions
export default app;
