import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SCERET);              //Rember in database id with _id hoti hai
    //AGter Successfully ho to Redirect login page in frontend
    res
        .status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,  // 15-minte 1-minte  1-second
            sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true, 

        }).json({  //use can send cookie for login at
            success: true,
            message,

        });
}