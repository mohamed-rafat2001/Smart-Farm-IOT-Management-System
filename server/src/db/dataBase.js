import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Handle database connection with proper error handling
const getDbUrl = () => {
	const dbUrl = process.env.DB_URL;
	const dbPassword = process.env.DB_PASSWORD;

	if (!dbUrl) {
		console.error("❌ DB_URL environment variable is not set");
		return null;
	}

	// If the connection string contains <db_password> placeholder, replace it
	if (dbUrl.includes("<db_password>")) {
		if (!dbPassword) {
			console.error(
				"❌ DB_PASSWORD environment variable is required when using <db_password> placeholder"
			);
			return null;
		}
		return dbUrl.replace("<db_password>", dbPassword);
	}

	// If no placeholder, use the connection string as is
	return dbUrl;
};

// Connection state tracking
let isConnected = false;
let connectionAttempts = 0;
const MAX_RETRY_ATTEMPTS = 5;
const RETRY_INTERVAL = 5000; // 5 seconds between retries

// Mongoose connection options with increased timeouts
const connectionOptions = {
	serverSelectionTimeoutMS: 60000, // Increased to 60 seconds
	socketTimeoutMS: 90000, // Increased to 90 seconds
	connectTimeoutMS: 60000, // Increased to 60 seconds
	keepAlive: true,
	keepAliveInitialDelay: 300000, // 5 minutes
	useNewUrlParser: true,
	useUnifiedTopology: true,
	bufferCommands: true, // Enable command buffering to prevent operation errors
	autoIndex: process.env.MODE !== 'PRODUCTION', // Don't build indexes in production
};

// Connect with retry logic
const connectWithRetry = async (dbUrl) => {
	try {
		await mongoose.connect(dbUrl, connectionOptions);
		isConnected = true;
		connectionAttempts = 0;
		console.log("✅ MongoDB connected successfully");
		return true;
	} catch (error) {
		connectionAttempts++;
		console.error(`❌ MongoDB connection attempt ${connectionAttempts} failed:`, error.message);
		
		// Log detailed error information
		if (error.name === 'MongooseServerSelectionError') {
			console.error("❌ Server selection timed out. Check network connectivity to MongoDB Atlas.");
			console.error("❌ Verify IP whitelist settings in MongoDB Atlas.");
		} else if (error.name === 'MongooseTimeoutError') {
			console.error("❌ Connection timed out. Check database server availability.");
		} else if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
			console.error("❌ Operation buffering timed out. Database may be overloaded or unreachable.");
		}
		
		// Retry logic
		if (connectionAttempts < MAX_RETRY_ATTEMPTS) {
			console.log(`⏱️ Retrying connection in ${RETRY_INTERVAL/1000} seconds...`);
			await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
			return connectWithRetry(dbUrl);
		} else {
			console.error(`❌ Failed to connect after ${MAX_RETRY_ATTEMPTS} attempts. Giving up.`);
			return false;
		}
	}
};

// Setup mongoose event listeners for connection monitoring
mongoose.connection.on('disconnected', () => {
	console.warn('⚠️ MongoDB disconnected');
	isConnected = false;
});

mongoose.connection.on('error', (err) => {
	console.error('❌ MongoDB connection error:', err);
	isConnected = false;
});

mongoose.connection.on('reconnected', () => {
	console.log('✅ MongoDB reconnected');
	isConnected = true;
});

// Main database connection function
export default async function dbConnect() {
	// If already connected, return immediately
	if (isConnected && mongoose.connection.readyState === 1) {
		return true;
	}
	
	const dbUrl = getDbUrl();
	if (!dbUrl) {
		console.error("❌ Cannot connect to database: Invalid configuration");
		return false;
	}
	
	return await connectWithRetry(dbUrl);
}
