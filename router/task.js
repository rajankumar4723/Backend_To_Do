import express from "express";
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticted } from "../middlewares/auth.js";

const router = express.Router();


router.post("/new", isAuthenticted, newTask);

router.get("/me", isAuthenticted, getMyTask);

router.route("/:id").put(isAuthenticted, updateTask).delete(isAuthenticted, deleteTask); //Make Sure delete or update only logged in user can change..




export default router;