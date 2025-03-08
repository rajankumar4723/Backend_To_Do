import express from "express";
import userRouter from "./router/user.js"
import taskRouter from "./router/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path: "./database/config.env"
})

//Used Middleware
app.use(express.json()); //Make Sure Uppere json, down routes OK
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));


//How to get User Information
app.get("/", (req, res) => {
    res.send("Mahadev");

});
//Used Middleware 
app.use(errorMiddleware);
