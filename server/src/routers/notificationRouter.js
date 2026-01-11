import express from "express";
import {
	getMyNotifications,
	markAllAsRead,
	markAsRead,
	deleteNotification,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddelware.js";

const router = express.Router();

// All routes after this middleware require authentication
router.use(protect);

router.get("/my-notifications", getMyNotifications);
router.patch("/mark-all-read", markAllAsRead);
router.patch("/:id/mark-read", markAsRead);
router.delete("/:id", deleteNotification);

export default router;
