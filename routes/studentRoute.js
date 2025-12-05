const express = require("express");
const router = express.Router();
const {getCourses} = require("../controllers/student/courses");
const {enrollInCourse} = require("../controllers/student/enrollment");
const {saveProgress} = require("../controllers/student/progress");

router.get("/courses", getCourses);
router.post("/enroll-in-course", enrollInCourse);
router.post("/save-progress", saveProgress);

module.exports = router;