const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyToken = require("../middleware/verifyToken");
const {addCourse, deleteCourse, updateCourse, getCourses} = require("../controllers/admin/course");
const {addResource, deleteResource, updateResource} = require("../controllers/admin/resource");

const fileUpload = multer({ dest: "uploads/" });

router.post("/add-course", verifyToken ,fileUpload.single("courseImage"), addCourse);
router.post("/add-resource", verifyToken , () => {
    try {
        const type = req.body.type;
        if (type === "link") {
            return next();
        } else if (type === "file") {
            return fileUpload.single("file")(req, res, next);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}, addResource);
router.delete("/delete-resource", verifyToken , deleteResource);
router.put("/update-resource", verifyToken , updateResource);
router.delete("/delete-course", verifyToken , deleteCourse);
router.put("/update-course", verifyToken , updateCourse);
router.get("/get-courses", verifyToken , getCourses);

module.exports = router;