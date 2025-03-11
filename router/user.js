import express from "express";
// import { deleteUser, getAllusers, getUserDetails, register, specialFunc, updateUser } from "../controllers/user.js";
import {  getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

// router.get("/all", getAllusers) For Admin panel for show all Users


router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);


router.get("/me",isAuthenticated, getMyProfile);

export default router;




// router.get("/userid/special", specialFunc);
// router.get("/userid/:id", getUserDetails);
// router.put("/userid/:id", updateUser)
// router
//     .route("/userid/:id")
//     .get(getUserDetails)
//     // .put(updateUser)
//     // .delete(deleteUser)
//     ;




