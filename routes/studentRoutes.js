const express = require("express");
const router = express.Router();
const {getCourses} = require("../controllers/student/courses");

router.get("/courses", getCourses);

module.exports = router;