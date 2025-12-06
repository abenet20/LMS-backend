const database = require("../data/database");
const verifyToken = require("../../middleware/verifyToken");

const addCourse = async (req, res) => {
    try {
    const {title, description,  createdBy} = req.body;
    // Prefer a public URL set by the upload middleware (supabase), else fall back to local path
    const courseImage = req.fileUrl || (req.file && (req.file.path || req.file.location || req.file.filename));

    if (!courseImage) {
        return res.status(400).json({ success: false, message: "Course image missing. Send multipart/form-data with field 'file' or ensure middleware sets req.fileUrl." });
    }

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

const getCourses = async (req, res) => {
    try{
        const [courses] = await database.query(
            "SELECT * FROM courses LEFT JOIN resources ON courses.id = resources.course_id LEFT JOIN enrollments ON courses.id = enrollments.course_id LEFT JOIN progress ON courses.id = progress.course_id WHERE courses.is_active = 1");
        res.status(200).json({ success: true, courses });
    } catch (error){
        res.status(500).json({ success: false, message: "there are no courses found" });
    }
};


module.exports = {addCourse, deleteCourse, updateCourse, getCourses};