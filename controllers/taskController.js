// controllers/taskController.js
const Task = require('../models/Task');

async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function createTask(req, res) {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, completed }, { new: true });
    res.json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
