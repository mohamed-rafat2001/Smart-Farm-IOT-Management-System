import multer from "multer";
import AppError from "./appError.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use relative path for better portability across environments
const uploadDir = path.join(__dirname, "../../public/temp/uploads");

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		// Check if directory exists before saving file
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}

		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split("/")[1];
		cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
	},
});

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new AppError("Not an image! Please upload only images.", 400), false);
	}
};

// Enhanced multer configuration with file size limits and timeout
const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB limit
		files: 1, // Only allow 1 file
	},
	timeout: 30000, // 30 second timeout for file processing
});

export default upload;
