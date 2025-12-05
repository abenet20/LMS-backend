const database = require("../data/database");
const verifyToken = require("../../middleware/verifyToken");

const enrollInCourse = verifyToken(async (req, res) => {
    try {
        const {courseId, userId} = req.body;
        const enrollment = await database.query("INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)", [userId, courseId]);
        res.status(200).json({ success: true, enrollment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = {enrollInCourse};