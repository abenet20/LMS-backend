const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../middleware/cloudinary");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const verifyToken = require("../middleware/verifyToken");
const {addCourse, deleteCourse, updateCourse, getCourses} = require("../controllers/admin/course");
const {dashboardStats} = require("../controllers/admin/dashboard");
const {addResource, deleteResource, updateResource, getResources} = require("../controllers/admin/resource");

const uploadPath = "uploads/";
   

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // folder name inside Cloudinary
  },
});

const fileUpload = multer({ storage });

router.post(
    "/add-course",
    verifyToken,
    fileUpload.single("coverImage"),
    addCourse
);
router.post(
  "/add-resource",
  verifyToken,
  fileUpload.single("file"),
  addResource
);
router.get("/dashboard-stats", verifyToken , dashboardStats);
router.delete("/delete-resource", verifyToken , deleteResource);
router.put("/update-resource", verifyToken , updateResource);
router.delete("/delete-course", verifyToken , deleteCourse);
router.put("/update-course", verifyToken , updateCourse);
router.get("/get-courses", verifyToken , getCourses);
router.get("/get-resources/:courseId", verifyToken , getResources);

module.exports = router;