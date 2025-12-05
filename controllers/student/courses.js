const database = require("../data/database");

const getCourses = async (req, res) => {
    const courses = await database.query(
        "SELECT * FROM courses LEFT JOIN resources ON courses.id = resources.course_id WHERE courses.is_active = 1");
    res.status(200).json({ success: true, courses });
};

module.exports = {getCourses};