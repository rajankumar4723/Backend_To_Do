import { User } from "../models/user.js";
import bcrypt from "bcryptjs";  // Replace bcrypt with bcryptjs
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// export const getAllusers = async (req, res) => {

// };
export const getAllUsers = async (req, res, next) => {
    try {
        // Check if the logged-in user is an admin
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Access Denied! Admin Only",
            });
        }

        // Fetch all users with passwords and tasks populated
        const users = await User.find().select("+password").populate("tasks");

        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        next(error);
    }
};


export const userUpdate = async (req, res) => {
    const { email, isAdmin } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    user.isAdmin = isAdmin;
    await user.save();

    res.json({ success: true, message: "User updated successfully", user });
}

export const getAdminDashboard = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome Admin!",
        user: req.user
    });
};



export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");//Manulay select password because in models.js under password false...

        // if (!user) return res.status(404).json({
        //     success: false,
        //     message: "Invaild Email or Password",
        // });
        if (!user) return next(new ErrorHandler("Invaild Email or Password", 400));

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return next(new ErrorHandler("Invaild Password", 404));

        sendCookie(user, res, `Welcome back, ${user.name}`, 200);
    } catch (error) {
        next(error);

    }
};



export const register = async (req, res ,next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        // if (user) return res.status(404).json({
        //     success: false,
        //     message: "User Already Exits",
        // });
        if (user) return next(new ErrorHandler("User Already Exits", 404));

        //Make Sure Key hai Password k name send karna hai hasedPassword
        const hashedPassword = await bcrypt.hash(password, 10)//Bcrypt password
        user = await User.create({ name, email, password: hashedPassword })

        sendCookie(user, res, "Register Successfully", 201);
    } catch (error) {
        next(error);

    }

};




export const getMyProfile = (req, res) => { //When not async funtion not optional try catch
    //how to find id but dont have what i can do we make sure logined time. i Can id access in Token "because i have token"
    // const id = "myId";//Ager mere pass id to main user ka information i can get 
    res.status(200).json({
        success: true,
        user: req.user,
    });



};

export const logout = (req, res) => { //When not async funtion not optional try catch
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
            
        })
        .json({
            success: true, user: req.user,

        })
}






// export const specialFunc = (req, res) => {

//     res.json({
//         success: true,
//         message: "Just Chacking",
//     });
// }

// export const updateUser = async (req, res) => {
//     // const id = req.query.id; // You can access using query
//     const { id } = req.params; //This is Desctures for data access using body
//     const user = await User.findById(id);

//     res.json({
//         success: true,
//         message:"Updated",

//     })
// }
// export const deleteUser = async (req, res) => {
//     // const id = req.query.id; // You can access using query
//     const { id } = req.params; //This is Desctures for data access using body
//     const user = await User.findById(id);

//     // await user.remove();

//     res.json({
//         success: true,
//         message:"Deleted",

//     })
// }