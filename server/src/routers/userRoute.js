import {
	deleteMe,
	getMe,
	updateMe,
	uploadSinglePhoto,
	uploadUserPhoto,
} from "../controllers/userController.js";
import { protect } from "../middelwares/authMiddelware.js";
import express from "express";
import corsMiddleware from "../utils/corsMiddleware.js";

const Router = express.Router();

// add protect func to all routes
Router.use(protect);

Router.route("/").get(getMe).patch(updateMe).delete(deleteMe);

// Apply CORS middleware specifically to the userImg route
Router.route("/userImg").options(corsMiddleware).patch(corsMiddleware, uploadSinglePhoto, uploadUserPhoto);

export default Router;
