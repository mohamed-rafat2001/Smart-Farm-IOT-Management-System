import {
	forgotPassord,
	resetPassword,
	login,
	signUp,
	updatePassword,
	logOut,
} from "../controllers/authController.js";
import { protect } from "../middelwares/authMiddelware.js";

import express from "express";
const Route = express.Router();

Route.post("/signUp", signUp);
// Also add the lowercase version to handle both cases
Route.post("/signup", signUp);
Route.post("/login", login);
Route.post("/logOut", logOut);
Route.post("/forgotPassword", forgotPassord);
Route.patch("/resetPassword", resetPassword);
Route.patch("/updatePassword", protect, updatePassword);

export default Route;
