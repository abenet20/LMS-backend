const database = require("../data/database");
const verifyToken = require("../../middleware/verifyToken");

const enrollInCourse = async (req, res) => {
    try {
        const {courseId, userId} = req.body;
        const enrollment = await database.query("INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)", [userId, courseId]);
        res.status(200).json({ success: true, enrollment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const enrolledCourses = async (req, res) => {
    try {
        const {userId} = req.params;
        const [enrollments] = await database.query(
            "SELECT courses.* FROM enrollments JOIN courses ON enrollments.course_id = courses.id WHERE enrollments.user_id = ?",
            [userId]
        );
        res.status(200).json({ success: true, enrollments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {enrollInCourse, enrolledCourses};