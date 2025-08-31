import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import catchAsync from "./catchAsync.js";
import appError from "../utils/appError.js";

// authentication
export const protect = catchAsync(async (req, res, next) => {
	let token;
	
	// Check for token in cookies first (preferred method)
	if (req.cookies.token) {
		token = req.cookies.token;
	} 
	// Fallback to Authorization header if needed
	else if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	}
	
	if (!token) {
		console.log("No auth token found for request:", req.originalUrl);
		return next(new appError("Authentication required", 401));
	}
	
	try {
		// verification token
		const decode = jwt.verify(token, process.env.JWTKEY);

		// check if user still exist
		const user = await userModel.findById(decode._id);
		if (!user) {
			return next(
				new appError("User no longer exists", 404)
			);
		}

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
