import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cookieParser from "cookie-parser";

// Import custom middleware
import { timeoutMiddleware, errorBoundaryMiddleware, asyncHandler } from "./middleware/timeoutMiddleware.js";

// Import routers
import userRoute from "./routers/userRoute.js";
import authRouter from "./routers/authRouter.js";
import adminRouter from "./routers/adminRouter.js";
import farmRouter from "./routers/farmRouter.js";
import dbConnection from "./db/dataBase.js";
import appError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";

// Load environment variables first
dotenv.config();

export const app = express();

// Basic middleware that should always work
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// CORS configuration with reflected origin (permissive for Vercel dynamic subdomains)
const corsOptions = {
	origin: true, 
	credentials: true,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	allowedHeaders: [
		"Content-Type",
		"Authorization",
		"Content-Length",
		"X-Requested-With",
		"Accept",
		"Origin",
	],
	exposedHeaders: ["Content-Disposition"],
	preflightContinue: false,
	optionsSuccessStatus: 204,
	maxAge: 86400, // 24 hours
};
app.use(cors(corsOptions));

// Add timeout middleware early in the chain
app.use(timeoutMiddleware(120000)); // 120 second timeout (increased for slow connections)

// Security middleware with cross-origin support
try {
	app.use(helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" }
    }));
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

// Timeout is already handled by timeoutMiddleware above
// Removed redundant req.setTimeout to prevent premature 408 errors during CPU-intensive operations like password hashing


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

try {
	app.use(xss());
} catch (error) {
	// XSS protection failed
}

try {
	app.use(hpp());
} catch (error) {
	// HPP protection failed
}

// Health check endpoint for Vercel
app.get("/api/v1/health", (req, res) => {
	res.status(200).json({
		status: "success",
		message: "Smart Farm API is running",
		timestamp: new Date().toISOString(),
		environment: process.env.MODE || "development",
	});
});

// Register routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/farm", farmRouter);

// Database connection status endpoint
app.get("/api/v1/db-status", async (req, res) => {
	try {
		const dbConnect = await import("./db/dataBase.js");
		const connected = await dbConnect.default();
		res.status(200).json({
			status: "success",
			message: "Database connection status",
			connected: connected,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "Database connection failed",
			error: error.message,
			timestamp: new Date().toISOString(),
		});
	}
});

// Database connection (Non-blocking but started)
dbConnection();

// Handle unhandled routes
app.all("*", (req, res, next) => {
    next(new appError(`can't find ${req.originalUrl} on this server.`, 404));
});

// Global error handler
app.use(globalErrorHandler);

// Initialize application (maintained for legacy compatibility if needed)
export const initializeApp = async () => {
	return true;
};
