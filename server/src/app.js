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

// Load environment variables first
dotenv.config();

export const app = express();

// Basic middleware that should always work
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// CORS configuration with fallback
const corsOptions = {
	origin: function(origin, callback) {
		const allowedOrigins = [
			"http://localhost:5173",
			"http://localhost:5174",
			"https://smart-farm-client.vercel.app",
			"https://smart-farm-client-git-main.vercel.app",
			"https://smart-farm-client-git-develop.vercel.app",
			"https://smart-farm-client-v1.vercel.app",
			"https://smart-farm-server-v1.vercel.app",
			process.env.CLIENT_URL,
		].filter(Boolean);
		
		// Allow requests with no origin (like mobile apps, curl requests)
		if (!origin || allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
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

// Security middleware with error handling
try {
	app.use(helmet());
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

// Initialize application with error handling
export const initializeApp = async () => {
	try {
		// Database connection with error handling
		let connected = false;
		try {
			const dbConnect = await import("./db/dataBase.js");
			connected = await dbConnect.default();
		} catch (error) {
			// Database connection failed
		}

		if (connected) {
			// Database connection established successfully
		}
		
		try {
			// Wrap all route handlers with asyncHandler to ensure errors are caught
			// Register routes with static imports for production
			app.use("/api/v1/auth", authRouter);
			app.use("/api/v1/user", userRoute);
			app.use("/api/v1/admin", adminRouter);
			app.use("/api/v1/farm", farmRouter);

		} catch (error) {
			// Failed to load routers

			// Add a fallback route for when routers fail
			app.all("/api/*", (req, res) => {
				res.status(500).json({
					status: "error",
					message: "Router initialization failed",
					error: error.message,
					timestamp: new Date().toISOString(),
				});
			});
		}

		// Error handlers with dynamic imports for better error handling
		try {
			const appError = await import("./utils/appError.js");
			const globalErrorHandler = await import("./controllers/errorController.js");

			//handel unhandel route
			app.all("*", (req, res, next) => {
				next(
					new appError.default(`can't find ${req.originalUrl} on this server.`, 404)
				);
			});

			//global error handler
			app.use(globalErrorHandler.default);
		} catch (error) {
			// Failed to load error handlers

			// Fallback error handler for unhandled routes
			app.all("*", (req, res) => {
				res.status(404).json({
					status: "error",
					message: `Route ${req.originalUrl} not found`,
					timestamp: new Date().toISOString(),
					environment: process.env.NODE_ENV || 'development',
					server: 'vercel'
				});
			});

			// Use the custom error boundary middleware as the final error handler
			app.use(errorBoundaryMiddleware);
		}
		
		return true;
	} catch (error) {
		return false;
	}
};
