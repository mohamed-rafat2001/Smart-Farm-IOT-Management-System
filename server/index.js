import { app } from "./src/app.js";

process.on("uncaughtException", (err) => {
	console.error("❌ Uncaught Exception:", err.message);
	// In production/Vercel, we might not want to exit the process
    if (!process.env.VERCEL) process.exit(1);
});

process.on("unhandledRejection", (err) => {
	console.error("❌ Unhandled Rejection:", err.message);
	if (!process.env.VERCEL) process.exit(1);
});

// For local development, start the server
if (!process.env.VERCEL) {
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
        console.log(`✅ Smart Farm Server listening on port ${port}`);
        console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`📊 Health check: http://localhost:${port}/api/v1/health`);
    });

    process.on("SIGTERM", () => {
        console.log("🛑 SIGTERM received, shutting down gracefully...");
        server.close(() => {
            console.log("✅ Server closed successfully");
            process.exit(0);
        });
    });
}

// Export app for Vercel
export default app;
