const database = require("../data/database");

const dashboardStats = async (req, res) => {
    try {
        const [studentsCount] = await database.query("SELECT COUNT(*) AS studentCount FROM users WHERE role = 'student'");
        const [courseCountResult] = await database.query("SELECT COUNT(*) AS courseCount FROM courses");
        const [enrollmentCountResult] = await database.query("SELECT COUNT(*) AS enrollmentCount FROM enrollments");
        const [resourceCount] = await database.query("SELECT COUNT(*) AS resourceCount FROM resources");
        res.status(200).json({
            success: true,
            stats: {
                students: studentsCount[0].studentCount,
                courses: courseCountResult[0].courseCount,
                enrollments: enrollmentCountResult[0].enrollmentCount,
                resources: resourceCount[0].resourceCount
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {dashboardStats};
