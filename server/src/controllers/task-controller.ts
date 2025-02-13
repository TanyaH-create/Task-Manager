//task-controller

import { Request, Response } from "express";
import { Task } from "../models/tasks.js"; // Import the Task model

// Handler for creating a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    console.log('CREATING TASK')
    const { title, description, userId} = req.body; // Extract data from request body
    console.log(title, description )
    

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Create a new task in the database
    const newTask = await Task.create({ 
      title, 
      description, 
      userId, 
      isComplete: false // Default the task to not complete
    });

    // Respond with the created task
    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ message: "Error creating task" });
  }
};
