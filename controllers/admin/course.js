const database = require("../data/database");
const verifyToken = require("../../middleware/verifyToken");

const addCourse = async (req, res) => {
    try {
    const {title, description,  createdBy} = req.body;
    const courseImage = req.file.path;
    const course = await database.query("INSERT INTO courses (title, description, course_image, created_by) VALUES (?, ?, ?, ?)", [title, description, courseImage, createdBy]);
    res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const {courseId} = req.body;
        const course = await database.query("DELETE FROM courses WHERE id = ?", [courseId]);
        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateCourse = async (req, res) => {
    try {
        const {courseId, title, description} = req.body;
        const course = await database.query("UPDATE courses SET title = ?, description = ? WHERE id = ?", [title, description, courseId]);
        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {addCourse, deleteCourse, updateCourse};