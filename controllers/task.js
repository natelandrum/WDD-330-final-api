const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllTasks = async (req, res) => {
  const result = await mongodb.getDb().db().collection("task").find();
  result.toArray(err => {
    if (err) {
      res.status(400).json({ message: err });
    }
  }).then((tasks) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(tasks);
  });
};

const createTask = async (req, res) => {
  const task = {
    title: req.body.title,
    description: req.body.description,
    due: req.body.due,
    priority: req.body.priority,
    completed: req.body.completed,
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection("task")
    .insertOne(task);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || { message: "Failed to create task" });
  }
};

const updateTask = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Must have a valid task id to update a task." });
  }
  const userId = ObjectId.createFromHexString(req.params.id);
  const task = {
    title: req.body.title,
    description: req.body.description,
    due: req.body.due,
    priority: req.body.priority,
    completed: req.body.completed,
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection("task")
    .replaceOne({ _id: userId }, task);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: "Failed to update task" });
  }
};

const deleteTask = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Must have a valid task id to delete a task." });
  }
  const userId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("task")
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
