const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");
const {addCourse, deleteCourse, updateCourse, getCourses} = require("../controllers/admin/course");
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

router.post("/add-course", verifyToken ,fileUpload.single("courseImage"), addCourse);
router.post(
    "/add-resource",
    verifyToken,
    (req, res, next) => {
      const { type } = req.query;  
      console.log(type);
  
      if (type === "link") {
        return next();
      }
  
      if (type === "file" || type === "video"  || type === "audio" || type === "pdf") {
        return fileUpload.single("file")(req, res, next);
      }
  
      return res.status(400).json({ success: false, message: "Invalid type" });
    },
    addResource
  );
router.delete("/delete-resource", verifyToken , deleteResource);
router.put("/update-resource", verifyToken , updateResource);
router.delete("/delete-course", verifyToken , deleteCourse);
router.put("/update-course", verifyToken , updateCourse);
router.get("/get-courses", verifyToken , getCourses);

module.exports = router;