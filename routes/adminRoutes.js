const express = require("express");
const router = express.Router();
const {addCourse} = require("../controllers/admin/addCourse");
const {addResource} = require("../controllers/admin/addResource");

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