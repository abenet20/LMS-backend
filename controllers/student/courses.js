const database = require("../data/database");

const getCourses = async (req, res) => {
    const courses = await database.query("SELECT * FROM courses");
    res.status(200).json({ success: true, courses });
};

module.exports = {getCourses};