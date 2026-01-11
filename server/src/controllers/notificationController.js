import Notification from "../models/notificationModel.js";
import catchAsync from "../middleware/catchAsync.js";
import AppError from "../utils/appError.js";
import * as factory from "./handlerFactory.js";

export const getMyNotifications = catchAsync(async (req, res, next) => {
	const notifications = await Notification.find({ user: req.user.id }).sort(
		"-createdAt"
	);

	res.status(200).json({
		status: "success",
		results: notifications.length,
		data: {
			notifications,
		},
	});
});

export const markAsRead = catchAsync(async (req, res, next) => {
	const notification = await Notification.findOneAndUpdate(
		{ _id: req.params.id, user: req.user.id },
		{ isRead: true },
		{ new: true, runValidators: true }
	);

	if (!notification) {
		return next(new AppError("No notification found with that ID", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			notification,
		},
	});
});

export const markAllAsRead = catchAsync(async (req, res, next) => {
	await Notification.updateMany(
		{ user: req.user.id, isRead: false },
		{ isRead: true }
	);

	res.status(200).json({
		status: "success",
		message: "All notifications marked as read",
	});
});

export const deleteNotification = factory.deleteOne(Notification);

// Helper function to create notification (usually called from other controllers)
export const createNotification = async (
	userId,
	type,
	title,
	message,
	link
) => {
	try {
		await Notification.create({
			user: userId,
			type,
			title,
			message,
			link,
		});
	} catch (err) {
		console.error("Error creating notification:", err);
	}
};
