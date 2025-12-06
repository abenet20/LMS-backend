const express = require("express");
const handleUpload = require("../middleware/fileUploader");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {addCourse, deleteCourse, updateCourse, getCourses, getResources} = require("../controllers/admin/course");
const {addResource, deleteResource, updateResource} = require("../controllers/admin/resource");


// // const uploadPath = "C:/Users/hp/Documents/uploads";   

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const fileUpload = multer({ storage });

// Multer memory storage (for Supabase)


router.post("/add-course", verifyToken ,handleUpload({ storageType: "supabase", fieldName: "file" }), addCourse);
router.post(
    "/add-resource",
    verifyToken,
    handleUpload({ storageType: "supabase", fieldName: "file" }),
    (req, res, next) => {
      const type = req.body.type;  
      req.resourceType = type;    
      next();
    },
    addResource
  );
  
router.delete("/delete-resource", verifyToken , deleteResource);
router.put("/update-resource", verifyToken , updateResource);
router.delete("/delete-course", verifyToken , deleteCourse);
router.put("/update-course", verifyToken , updateCourse);
router.get("/get-courses", verifyToken , getCourses);
router.get("/get-resources", verifyToken , getResources);

module.exports = router;