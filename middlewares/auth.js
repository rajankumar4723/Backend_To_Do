import { User } from "../models/user.js";
import jwt from "jsonwebtoken";


export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);

    if (!token) return res.status(404).json({
        success: false,
        message: "Login first",
    });

    const decoded = jwt.verify(token, process.env.JWT_SCERET);

    req.user = await User.findById(decoded._id);
    next();//next function call "/me",isAuthenticted, getMyProfilee


}
export const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({
            success: false,
            message: "Access Denied! Admins only",
        });
    }
    next();
};