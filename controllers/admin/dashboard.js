const database = require("../data/database");

const dashboardStats = async (req, res) => {
    try {
        const [studentsCount] = await database.query("SELECT COUNT(*) AS studentCount FROM users WHERE role = 'student'");
        const [courseCountResult] = await database.query("SELECT COUNT(*) AS courseCount FROM courses");
        const [enrollmentCountResult] = await database.query("SELECT COUNT(*) AS enrollmentCount FROM enrollments");
        const [resourceCount] = await database.query("SELECT COUNT(*) AS resourceCount FROM resources");
        const [students] = await database.query("SELECT u.id AS user_id, u.name AS name, u.email AS email FROM users u LEFT JOIN enrollments e ON e.user_id = u.id Left JOIN progress p ON p.user_id = u.id WHERE u.role = 'student'");
       const [recentCourses] = await database.query(`
    SELECT 
        c.*, 
        COUNT(e.id) AS enrolledStudents
    FROM 
        courses c
    LEFT JOIN 
        enrollments e 
        ON e.course_id = c.id
    GROUP BY 
        c.id
    ORDER BY 
        c.created_at DESC
    LIMIT 5
`);
 res.status(200).json({
            success: true,
            stats: {
                students: studentsCount[0].studentCount,
                courses: courseCountResult[0].courseCount,
                enrollments: enrollmentCountResult[0].enrollmentCount,
                resources: resourceCount[0].resourceCount,
                studentsList: students,
                recentCourses: recentCourses
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {dashboardStats};
