// const database = require("../data/database");

// const dashboardStats = async (req, res) => {
//     try {
//         const [userCountResult] = await database.query("SELECT COUNT(*) AS userCount FROM users");
//         const [courseCountResult] = await database.query("SELECT COUNT(*) AS courseCount FROM courses");
//         const [enrollmentCountResult] = await database.query("SELECT COUNT(*) AS enrollmentCount FROM enrollments");
//         const [activeCourseCountResult] = await database.query("SELECT COUNT(*) AS activeCourseCount FROM courses WHERE is_active = 1");