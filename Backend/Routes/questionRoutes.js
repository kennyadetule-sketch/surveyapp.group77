const express = require("express");
const router = express.Router();

const questionController = require("../Controllers/questionController");
const { protect } = require("../Middleware/AuthMiddleware");

//QUESTION ROUTES
router.post("/", protect, questionController.createQuestion);
router.put("/:id", protect, questionController.updateQuestion);
router.delete("/:id", protect, questionController.deleteQuestion);

module.exports = router;