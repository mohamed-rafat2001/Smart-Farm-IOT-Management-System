import { app, initializeApp } from "./src/app.js";

process.on("uncaughtException", (err) => {
	console.error("❌ Uncaught Exception:", err.message);
	process.exit(1);
});

process.on("unhandledRejection", (err) => {
	console.error("❌ Unhandled Rejection:", err.message);
	process.exit(1);
});

// Initialize the application
const startServer = async () => {
	try {
		console.log("🚀 Starting Smart Farm Server...");
		
		// Initialize app with database and routes
		const initialized = await initializeApp();
		
		if (!initialized) {
			console.warn("⚠️ App initialization had issues, but continuing...");
		}
		
		const port = process.env.PORT || 3000;
		
		// For Vercel, we export the app directly
		if (process.env.VERCEL) {
			console.log("✅ Running on Vercel - exporting app");
			return app;
		}
		
		// For local development, start the server
		const server = app.listen(port, () => {
			console.log(`✅ Smart Farm Server listening on port ${port}`);
			console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
			console.log(`📊 Health check: http://localhost:${port}/api/v1/health`);
		});
		
		// Graceful shutdown
		process.on("SIGTERM", () => {
			console.log("🛑 SIGTERM received, shutting down gracefully...");
			server.close(() => {
				console.log("✅ Server closed successfully");
				process.exit(0);
			});
		});
		
		return server;
	} catch (error) {
		console.error("❌ Failed to start server:", error.message);
		process.exit(1);
	}
};

// Start the server
startServer();

// Export app for Vercel
export default app;
