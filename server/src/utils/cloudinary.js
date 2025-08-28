import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary with timeout settings
cloudinary.config({
	cloud_name: process.env.cloud_name,
	api_key: process.env.api_key,
	api_secret: process.env.api_secret,
	secure: process.env.secure,
	timeout: 25000, // 25 second timeout for Cloudinary operations
});

// Add global timeout for all Cloudinary operations
cloudinary.config({
	...cloudinary.config(),
	upload_preset: process.env.upload_preset,
});

export default cloudinary;
