const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {getCourses} = require("../controllers/student/courses");
const {enrollInCourse} = require("../controllers/student/enrollment");
const {saveProgress} = require("../controllers/student/progress");

router.get("/courses", verifyToken , getCourses);
router.post("/enroll-in-course", verifyToken , enrollInCourse);
router.post("/save-progress", verifyToken , saveProgress);

module.exports = router;