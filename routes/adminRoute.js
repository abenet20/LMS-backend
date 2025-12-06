const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");
const {addCourse, deleteCourse, updateCourse, getCourses} = require("../controllers/admin/course");
const {dashboardStats} = require("../controllers/admin/dashboard");
const {addResource, deleteResource, updateResource} = require("../controllers/admin/resource");


const uploadPath = "C:/Users/hp/Documents/uploads";   

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileUpload = multer({ storage });

router.post(
    "/add-course",
    verifyToken,
    fileUpload.single("courseImage"),
    addCourse
);
router.post("/add-resource", verifyToken , fileUpload.single("file"), addResource);
router.get("/dashboard-stats", verifyToken , dashboardStats);
router.delete("/delete-resource", verifyToken , deleteResource);
router.put("/update-resource", verifyToken , updateResource);
router.delete("/delete-course", verifyToken , deleteCourse);
router.put("/update-course", verifyToken , updateCourse);
router.get("/get-courses", verifyToken , getCourses);

module.exports = router;