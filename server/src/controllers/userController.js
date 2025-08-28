import catchAsync from "../middelwares/catchAsync.js";
import UserModel from "../models/user.js";
import response from "../utils/handelRespone.js";
import appError from "../utils/appError.js";
import { deactivateDoc, updateDoc } from "./handlerFactory.js";
import upload from "../utils/multer.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

//  @desc	get user profile
// route   /api/v1/user
// method  get
// access  private/user
export const getMe = catchAsync(async (req, res, next) => {
	const user = await UserModel.findById(req.user._id);
	if (!user) return next(new appError("user not found", 404));
	response(res, 200, user);
});

//	@desc   update ME
// route   /api/v1/user
// method  patch
// access  private/user

export const updateMe = updateDoc(UserModel, "user", [
	"firstName",
	"lastName",
	"email",
	"phoneNumber",
]);

// @desc	 delete Me
// route   /api/v1/user
// method  delete
// access  private/user
export const deleteMe = deactivateDoc(UserModel, "user");

// @desc    upload single photo using multer
export const uploadSinglePhoto = upload.single("photo");

// @desc	 upload user profile
// route   /api/v1/user
// method  post
// access  private/user
export const uploadUserPhoto = catchAsync(async (req, res, next) => {
	if (req.file) {
		try {
			// upload img in cloudinary
			const startTime = Date.now();

			const { public_id, secure_url } = await cloudinary.uploader.upload(
				req.file.path,
				{ folder: `AgriTech/users/id_${req.user._id}/profileImg` }
			);

			// delete old img from cloudinary
			if (req.user.profileImg && req.user.profileImg.public_id) {
				try {
					await cloudinary.uploader.destroy(req.user.profileImg.public_id);
				} catch (deleteError) {
					// Continue with the process even if old image deletion fails
				}
			}

			// Update user profile
			req.user.profileImg = { public_id, secure_url };
			await req.user.save({ validateBeforeSave: false });

			// Clean up local file
			if (req.file && req.file.path && fs.existsSync(req.file.path)) {
				try {
					fs.unlinkSync(req.file.path);
				} catch (cleanupError) {
					// Continue even if cleanup fails
				}
			}

			// Ensure response is sent properly
			const responseData = {
				status: "success",
				profileImg: req.user.profileImg,
				user: req.user,
			};

			// Send response
			res.status(200).json(responseData);
		} catch (error) {
			// Clean up local file on error
			if (req.file && req.file.path && fs.existsSync(req.file.path)) {
				try {
					fs.unlinkSync(req.file.path);
				} catch (cleanupError) {
					// Continue even if cleanup fails
				}
			}

			// Send proper error response instead of throwing
			return res.status(500).json({
				status: "error",
				message: error.message || "Image upload failed",
				error: process.env.NODE_ENV === "development" ? error : {},
			});
		}
	} else {
		return res.status(400).json({
			status: "error",
			message: "No file uploaded",
		});
	}
});
