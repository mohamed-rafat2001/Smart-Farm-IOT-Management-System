import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import catchAsync from "./catchAsync.js";
import appError from "../utils/appError.js";

// authentication
export const protect = catchAsync(async (req, res, next) => {
	let token;
	
	// Check for token in cookies first (preferred method)
	if (req.cookies && req.cookies.token) {
		console.log("Found token in cookies");
		token = req.cookies.token;
	} 
	// Fallback to Authorization header if needed
	else if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		console.log("Found token in Authorization header");
		token = req.headers.authorization.split(" ")[1];
	}
	
	if (!token) {
		console.log("No auth token found for request:", req.originalUrl);
		console.log("Headers:", JSON.stringify(req.headers));
		console.log("Cookies:", JSON.stringify(req.cookies));
		return next(new appError("Authentication required", 401));
	}
	
	try {
		// verification token
		const decode = jwt.verify(token, process.env.JWTKEY);
		console.log("Token verified successfully");

		// check if user still exist
		const user = await userModel.findById(decode._id);
		if (!user) {
			console.log("User not found in database");
			return next(
				new appError("User no longer exists", 404)
			);
		}

		console.log("User authenticated:", user._id);
		req.user = user;
		next();
	} catch (error) {
		console.log("Token verification failed:", error.message);
		return next(new appError("Invalid or expired token", 401));
	}
});

// authorization and permissions
export const restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new appError("You don't have permission to perform this action", 403)
			);
		}
		next();
	};
};
