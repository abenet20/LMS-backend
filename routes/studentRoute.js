const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {getCourses} = require("../controllers/student/courses");
const {enrollInCourse} = require("../controllers/student/enrollment");
const {saveProgress} = require("../controllers/student/progress");
const { dashboardStats } = require("../controllers/student/dashboard");

router.get("/courses", verifyToken , getCourses);
router.post("/enroll-in-course", verifyToken , enrollInCourse);
router.post("/save-progress", verifyToken , saveProgress);
router.get("/dashboard-stats", verifyToken , dashboardStats);

module.exports = router;