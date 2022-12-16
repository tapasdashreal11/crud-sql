import express from "express";


import { authUser, deleteUser, getAllUsers, getUserById, modifyUser, registerUser } from "../controllers/userController.js";
import { Admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route('/').get((req,res)=> res.send("Hello World"))
router.route("/login").post(authUser);
router.route("/register-user").post(registerUser);
router.route("/get-all-users").get(protect, getAllUsers);
router.route("/get-user/:id").get(protect, getUserById);
router.route("/delete-user/:id").delete(protect, deleteUser);
router.route("/modify-user/:id").patch( protect, modifyUser);

export default router;