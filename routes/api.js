import express from "express";
import * as StudentController from "../controllers/StudentController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// Student Routes
router.post("/register", StudentController.Registration);
router.post("/login", StudentController.Login);
router.get("/profile", AuthMiddleware, StudentController.ProfileDetails);
router.post("/profile/update", AuthMiddleware, StudentController.ProfileUpdate);
router.post("/profile/upload", AuthMiddleware, upload.single('profilePic'), StudentController.UploadProfilePic);
router.get("/profile/pic", AuthMiddleware, StudentController.ReadProfilePic);
router.delete("/profile/pic", AuthMiddleware, StudentController.DeleteProfilePic);

export default router;
