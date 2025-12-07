const database = require("../data/database");
const verifyToken = require("../../middleware/verifyToken");

const saveProgress = async (req, res) => {
    try {
        const {courseId, userId, resourceId ,status} = req.body;
        const progress = await database.query("INSERT INTO progress (user_id, course_id, resource_id, status) VALUES (?, ?, ?, ?)", [userId, courseId, resourceId, status]);
        res.status(200).json({ success: true, progress });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProgress = async (req, res) => {
    try {
        const {userId, courseId} = req.body;
        const [progress] = await database.query("SELECT * FROM progress WHERE user_id = ? AND course_id = ?", [userId, courseId]);
        res.status(200).json({ success: true, progress });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// const 

module.exports = {saveProgress, getProgress};