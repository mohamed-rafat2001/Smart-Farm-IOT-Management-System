import {
	deleteMe,
	getMe,
	updateMe,
	uploadSinglePhoto,
	uploadUserPhoto,
} from "../controllers/userController.js";
import { protect } from "../middelwares/authMiddelware.js";
import express from "express";

const Router = express.Router();

// add protect func to all routes
Router.use(protect);

Router.route("/").get(getMe).patch(updateMe).delete(deleteMe);
Router.route("/userImg").patch(uploadSinglePhoto, uploadUserPhoto);
export default Router;
