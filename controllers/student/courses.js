const database = require("../data/database");

const getCourses = async (req, res) => {
    const {userId} = req.params;
    const [courses] = await database.query(
        "SELECT * FROM courses WHERE is_active = 1");
    res.status(200).json({ success: true, courses });
};

const getResources = async (req, res) => {
    try {
        const {courseId} = req.params;
        const [resources] = await database.query(
            "SELECT * FROM resources WHERE course_id = ?", [courseId]
        );
        res.status(200).json({ success: true, resources });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {getCourses, getResources};