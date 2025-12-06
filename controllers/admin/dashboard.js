const database = require("../data/database");

const dashboardStats = async (req, res) => {
    try {
        const [[{ totalCourses }]] = await database.query("SELECT COUNT(*) AS totalCourses FROM courses");
        const [[{ totalResources }]] = await database.query("SELECT COUNT(*) AS totalResources FROM resources");
        const [[{ totalStudents }]] = await database.query("SELECT COUNT(*) AS totalUsers FROM users WHERE role = 'student'");
        const [[{ activeStudents }]] = await database.query("SELECT COUNT(*) AS activeStudents FROM users WHERE role = 'student' AND is_active = 1");
        const [[{ totalEnrollments }]] = await database.query("SELECT COUNT(*) AS totalEnrollments FROM enrollments");
        const [[{ totalProgress }]] = await database.query("SELECT COUNT(*) AS totalProgress FROM progress WHERE progress = 'completed'");
        res.status(200).json({ 
            success: true, 
            stats: {
                totalCourses,
                totalResources,
                totalStudents,
                activeStudents,
                totalEnrollments,
                totalProgress
            } 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { dashboardStats };