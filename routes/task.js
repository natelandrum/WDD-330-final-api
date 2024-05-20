const router = require("express").Router();

const controller = require("../controllers/task");
const validation = require("../validation/task");

router.get(
  "/",
  controller.getAllTasks,
);

router.post(
  "/",
  validation.saveTask,
  controller.createTask
);

router.put(
  "/:id",
  validation.saveTask,
  controller.updateTask
);

router.delete(
  "/:id",
  controller.deleteTask
);

module.exports = router;
