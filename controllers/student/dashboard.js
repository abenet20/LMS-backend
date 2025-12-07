const database = require("../data/database");

const dashboardStats = async (req, res) => {
    try {
        const [enrolledCoursesCount] = await database.query(
            "SELECT COUNT(*) AS enrolledCourses FROM enrollments WHERE user_id = ?", [req.user.id]
        );
        const [completedCoursesCount] = await database.query(
            "SELECT COUNT(*) AS completedCourses FROM progress WHERE user_id = ? AND status = 'completed'", [req.user.id]
        );
        const inProgressCount =  (enrolledCoursesCount[0].enrolledCourses - completedCoursesCount[0].completedCourses);
        const [completedCourses] = await database.query(
            "SELECT courses.* FROM progress JOIN courses ON progress.course_id = courses.id WHERE progress.user_id = ? AND progress.status = 'completed'", [req.user.id]
        );
        const [inProgress] = await database.query(
            "SELECT courses.* FROM enrollments JOIN courses ON enrollments.course_id = courses.id WHERE enrollments.user_id = ? AND courses.id NOT IN (SELECT course_id FROM progress WHERE user_id = ? AND status = 'completed')", [req.params.userId, req.params.userId]
        );
        res.status(200).json({
            success: true,
            stats: {
                enrolledCoursesCount: enrolledCoursesCount[0].enrolledCourses,
                completedCoursesCount: completedCoursesCount[0].completedCourses,
                inProgressCount: inProgressCount,
                completedCourses: completedCourses,
                inProgress: inProgress
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {dashboardStats};

