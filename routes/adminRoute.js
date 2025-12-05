const express = require("express");
const router = express.Router();
const multer = require("multer");
const {addCourse, deleteCourse, updateCourse} = require("../controllers/admin/course");
const {addResource, deleteResource, updateResource} = require("../controllers/admin/resource");

const fileUpload = multer({ dest: "uploads/" });

router.post("/add-course", fileUpload.single("courseImage"), addCourse);
router.post("/add-resource", () => {
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
router.delete("/delete-resource", deleteResource);
router.put("/update-resource", updateResource);
router.delete("/delete-course", deleteCourse);
router.put("/update-course", updateCourse);

module.exports = router;