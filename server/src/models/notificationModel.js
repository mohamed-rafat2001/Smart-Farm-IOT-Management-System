import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "Notification must belong to a user."],
		},
		type: {
			type: String,
			enum: ["info", "success", "warning", "critical"],
			default: "info",
		},
		title: {
			type: String,
			required: [true, "Notification must have a title."],
		},
		message: {
			type: String,
			required: [true, "Notification must have a message."],
		},
		link: {
			type: String, // Optional link for navigation when notification is clicked
		},
		isRead: {
			type: Boolean,
			default: false,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Index for faster queries on user and read status
notificationSchema.index({ user: 1, isRead: 1 });
notificationSchema.index({ createdAt: -1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
