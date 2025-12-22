import "../loadEnv.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

import cookieParser from "cookie-parser";

// Import custom middleware
import {
	timeoutMiddleware,
} from "./middleware/timeoutMiddleware.js";

// Import routers
import userRoute from "./routers/userRoute.js";
import authRouter from "./routers/authRouter.js";
import adminRouter from "./routers/adminRouter.js";
import farmRouter from "./routers/farmRouter.js";
import dbConnection from "./db/dataBase.js";
import appError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

export const app = express();

// 1. Robust CORS handling for Vercel
app.use(
	cors({
		origin: [
			"https://smart-farm-client-v1.vercel.app",
			"http://localhost:5173",
			"http://localhost:5174",
		],
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
		allowedHeaders: [
			"X-CSRF-Token",
			"X-Requested-With",
			"Accept",
			"Accept-Version",
			"Content-Length",
			"Content-MD5",
			"Content-Type",
			"Date",
			"X-Api-Version",
			"Authorization",
			"Origin",
		],
		optionsSuccessStatus: 200,
	})
);

// 2. Trust Vercel Proxy
app.enable("trust proxy");

// 3. Health check
app.get("/api/v1/health", (req, res) => {
	res.status(200).json({
		status: "success",
		message: "Smart Farm API is running",
		timestamp: new Date().toISOString(),
	});
});

// Basic middleware
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Add timeout middleware
app.use(timeoutMiddleware(120000));

// Security middleware with cross-origin support
try {
	app.use(
		helmet({
			crossOriginResourcePolicy: { policy: "cross-origin" },
			contentSecurityPolicy: false, // Disable CSP to avoid interference with CORS for now
		})
	);
} catch (error) {
	// Helmet failed
}

// Rate limiting with error handling
try {
	const limiter = rateLimit({
		max: 100,
		windowMs: 60 * 60 * 1000,
		message: "too many requests for this IP, Please try again in an hour ",
	});
	app.use("/api", limiter);
} catch (error) {
	// Rate limiting failed
}

// Add request logging middleware
app.use((req, res, next) => {
	const start = Date.now();

	res.on("finish", () => {
		const duration = Date.now() - start;
	});

	next();
});

// Data sanitization middleware with error handling
try {
	app.use(mongoSanitize());
} catch (error) {
	// Mongo sanitize failed
}

// Register routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/farm", farmRouter);

// Database connection status endpoint
app.get("/api/v1/db-status", (req, res) => {
	const status = mongoose.connection.readyState;
	const states = {
		0: "disconnected",
		1: "connected",
		2: "connecting",
		3: "disconnecting",
	};

	res.status(200).json({
		status: "success",
		message: "Database connection status",
		connected: status === 1,
		state: states[status],
		timestamp: new Date().toISOString(),
	});
});

// Handle unhandled routes
app.all("*", (req, res, next) => {
	next(new appError(`can't find ${req.originalUrl} on this server.`, 404));
});

// Global error handler
app.use((err, req, res, next) => {
	// Ensure all errors are logged in production/Vercel for debugging
	console.error("🔥 Global Error Handler:", {
		message: err.message,
		stack: err.stack,
		path: req.originalUrl,
		method: req.method,
	});
	next(err);
});
app.use(globalErrorHandler);

// Initialize application (maintained for legacy compatibility if needed)
export const initializeApp = async () => {
	return true;
};
