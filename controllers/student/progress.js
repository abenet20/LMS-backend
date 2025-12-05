const database = require("../data/database");
const verifyToken = require("../../middleware/verifyToken");

const saveProgress = verifyToken(async (req, res) => {
    try {
        const {courseId, userId, resourseId ,status} = req.body;
        const progress = await database.query("INSERT INTO progress (user_id, course_id, resourse_id, status) VALUES (?, ?, ?, ?)", [userId, courseId, resourseId, status]);
        res.status(200).json({ success: true, progress });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = {saveProgress};