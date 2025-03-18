import express from "express";
// import { deleteUser, getAllusers, getUserDetails, register, specialFunc, updateUser } from "../controllers/user.js";
import { getAdminDashboard, getMyProfile, login, logout, register, userUpdate } from "../controllers/user.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { getAllUsers } from "../controllers/user.js";


const router = express.Router();

// router.get("/all", getAllusers) For Admin panel for show all Users
router.get("/admin", isAuthenticated, getAllUsers);



router.get("/getadmindashboard", isAuthenticated, isAdmin, getAdminDashboard);


router.put("/update-admin", isAuthenticated, userUpdate);

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);


router.get("/me", isAuthenticated, getMyProfile);

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




