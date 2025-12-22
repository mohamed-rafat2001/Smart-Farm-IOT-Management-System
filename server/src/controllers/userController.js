import catchAsync from "../middelwares/catchAsync.js";
import UserModel from "../models/user.js";
import response from "../utils/handelRespone.js";
import appError from "../utils/appError.js";
import { deactivateDoc, updateDoc } from "./handlerFactory.js";
import upload from "../utils/multer.js";
import cloudinary from "../utils/cloudinary.js";

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
// route   /api/v1/user/userImg
// method  patch
// access  private/user
export const uploadUserPhoto = catchAsync(async (req, res, next) => {
	if (req.file) {
		try {
			// Create a dataURI from the buffer for Cloudinary upload
			const dataURI = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
			
			// upload img in cloudinary
			const { public_id, secure_url } = await cloudinary.uploader.upload(
				dataURI,
				{ folder: `AgriTech/users/id_${req.user._id}/profileImg` }
			);


			// delete old img from cloudinary
			if (req.user.profileImg && req.user.profileImg.public_id) {
				try {
					await cloudinary.uploader.destroy(req.user.profileImg.public_id);
				} catch (deleteError) {
					console.log("Failed to delete old image:", deleteError);
				}
			}

			// Use updateOne for a direct database update and capture the result
            await UserModel.updateOne(
                { _id: req.user._id },
                { 
                    $set: { 
                        profileImg: { 
                            public_id: public_id, 
                            secure_url: secure_url 
                        } 
                    } 
                }
            );

            // Fetch the user object fresh from the database
            const updatedUser = await UserModel.findById(req.user._id);

			// Ensure response is sent properly
			const responseData = {
				status: "success",
				profileImg: updatedUser.profileImg,
				user: updatedUser,
			};

			// Send response
			res.status(200).json(responseData);
		} catch (error) {
			// Send proper error response
			return next(new appError(error.message || "Image upload failed", 500));
		}
	} else {
		return next(new appError("No file uploaded", 400));
	}
});

// @desc    get all users
// route    /api/v1/user/admin
// method   get
// access   private/admin
export const getAllUsers = catchAsync(async (req, res, next) => {
	const users = await UserModel.find();
	response(res, 200, users);
});

// @desc    get user by id
// route    /api/v1/user/admin/:id
// method   get
// access   private/admin
export const getUserById = catchAsync(async (req, res, next) => {
	const user = await UserModel.findById(req.params.id);
	if (!user) return next(new appError("user not found", 404));
	response(res, 200, user);
});

// @desc    update user
// route    /api/v1/user/admin/:id
// method   patch
// access   private/admin
export const updateUser = catchAsync(async (req, res, next) => {
	const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!user) return next(new appError("user not found", 404));
	response(res, 200, user);
});

// @desc    delete user
// route    /api/v1/user/admin/:id
// method   delete
// access   private/admin
export const deleteUser = catchAsync(async (req, res, next) => {
	const user = await UserModel.findByIdAndDelete(req.params.id);
	if (!user) return next(new appError("user not found", 404));
	response(res, 204, null);
});
