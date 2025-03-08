import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {

  try {
    const { title, description } = req.body;
    await Task.create({
        title,
        description,
        user: req.user,
    });

    res.status(201).json({
        success: true,
        message: "Task Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id; //This help of find user with id help of all task display.

    const tasks = await Task.find({ user: userid });
    res.status(200).json({
        success: true,
        tasks,
    });
  } catch (error) {
    next(error);
    
  }

};
export const updateTask = async (req, res, next) => {

    try {
        const id = req.params.id;//desc
    const task = await Task.findById(id);

    task.isCompleted = !task.isCompleted; //this boolean true or false

    if(!task) return next(new ErrorHandler("Task Not Found",404));

    await task.save(); //Task Save or Promise retrun 

    res.status(200).json({
        success: true,
        message: "Task Updated",

    });
    } catch (error) {
        next(error);
    }

};
export const deleteTask = async (req, res, next) => {
   try {
    const id = req.params.id;//desc
    const task = await Task.findById(id);

    if(!task) return next(new ErrorHandler("Task Not Found",404));
    await task.deleteOne(); //Task Remove or deleted

    res.status(200).json({
        success: true,
        message: "Task Deleted",

    });
   } catch (error) {
    next(error);
   }
}