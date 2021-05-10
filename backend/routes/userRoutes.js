
import express from "express"
const router = express.Router()

import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile
} from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"

router.post("/login", authUser)
// the request goes through two middlewares
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)
router.route("/").post(registerUser)

export default router