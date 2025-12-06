const express = require("express");
const handleUpload = require("../middleware/fileUploader");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {addCourse, deleteCourse, updateCourse, getCourses, getResources} = require("../controllers/admin/course");
const {addResource, deleteResource, updateResource} = require("../controllers/admin/resource");
const { dashboardStats } = require("../controllers/admin/dashboard");


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
router.get("/dashboard-stats", verifyToken , dashboardStats);

module.exports = router;