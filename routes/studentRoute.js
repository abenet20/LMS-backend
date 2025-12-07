const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {getCourses, getResources} = require("../controllers/student/courses");
const {enrollInCourse, deleteEnrollment} = require("../controllers/student/enrollment");
const {saveProgress, getProgress} = require("../controllers/student/progress");
const { dashboardStats } = require("../controllers/student/dashboard");

router.get("/courses", verifyToken , getCourses);
router.post("/enroll-in-course", verifyToken , enrollInCourse);
router.post("/save-progress", verifyToken , saveProgress);
router.get("/dashboard-stats", verifyToken , dashboardStats);
router.delete("/delete-enroll", verifyToken, deleteEnrollment)
router.get("/get-resources/:courseId", verifyToken , getResources);
router.post("/get-progress", verifyToken , getProgress);

module.exports = router;