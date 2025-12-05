const express = require("express");
const router = express.Router();
const {getCourses} = require("../controllers/student/courses");
const {enrollInCourse} = require("../controllers/student/enrollment");

router.get("/courses", getCourses);
router.post("/enroll-in-course", enrollInCourse);

module.exports = router;