const TaskModel = require("../models/TaskModel");

const createTask = async(req, res) => {
    const data = req.body;
    try {
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({ message: "Task created successfully",success:true });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
}

//fetch all tasks
const fetchAllTasks = async(req, res) => {
    
    try {
        const data = await TaskModel.find({});
        
        res.status(201).json({ message: "All task",success:true,data });
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error });
    }
}


const updateTaskById = async(req, res) => {
    
    try {
        const id = req.params.id;
        const body = req.body
        const obj = {
            $set:{...body}
        }
        const data = await TaskModel.findByIdAndUpdate(id,obj)
        
        res.status(200).json({ message: "Task updated",success:true });
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
}

const deleteTaskById = async(req, res) => {
    
    try {
        const id = req.params.id;
        await TaskModel.findByIdAndDelete(id)
        
        res.status(200).json({ message: "task deleted",success:true});
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
}

module.exports = { 
    createTask,fetchAllTasks,updateTaskById,deleteTaskById
 };