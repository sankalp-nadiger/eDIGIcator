import express from "express";
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateAccountDetails,
    updateUserDP,
    getUserStats,
    updateUserSchedule,
    sendOTP
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(
    upload.fields([
        {
            name: "profileImage",
            maxCount: 1
        }, 
    ]),
    registerUser
);

router.route("/login").post(loginUser);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/updateSchedule").patch(updateUserSchedule);
router.route("/user/userStats").get(verifyJWT, getUserStats);
router.post("/send-otp", sendOTP); 
router.route("/profileimage").patch(verifyJWT, upload.single("profileImage"), updateUserDP);
router.route("/updateSchedule").patch(updateUserSchedule);
export default router;
