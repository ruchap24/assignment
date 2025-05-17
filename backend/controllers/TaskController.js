const Task = require("../models/Task");

// GET FUNCTIONS
exports.getAllTasks = async (req, res) => {
  try {
    console.log(req.userPayload);
    const userId = req.userPayload.id;
    const data = await Task.find({ userId });
    if (data.length === 0) {
      res.status(404).json({
        message: "No tasks found",
      });
    } else {
      res.status(200).json(data);
      console.log("Tasks fetched successfully");
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Interval server error",
      details: error.message,
    });
  }
};

// POST FUNCTIONS
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    console.log("In create task controller");
    console.log(req.body);
    const userId = req.userPayload.id;
    // create new task
    const newTask = new Task({
      userId,
      title,
      description,
      status,
      priority,
    });
    const savedTask = await newTask.save();
    console.log(savedTask);
    res.status(201).json({
      response: savedTask,
      msg: "task created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred",
      details: error.message,
    });
  }
};
// PUT FUNCTIONS
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTaskData = req.body;
    const userId = req.userPayload.id;

    const response = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      updatedTaskData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "task not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred",
      details: error.message,
    });
  }
};
// DELETE FUNCTIONS
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    console.log("in delete task");

    const userId = req.userPayload.id;

    const response = await Task.findOneAndDelete({ _id: taskId, userId });
    console.log("response"  + response);
    if (!response) {
      return res.status(404).json({ error: "task not found" });
    }
    res.status(200).json({
      response: response,
      message: "task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred",
      details: error.message,
    });
  }
};
exports.deleteAllTasks = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred",
      details: error.message,
    });
  }
};
