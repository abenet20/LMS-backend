const database = require("../data/database");

const getCourses = async (req, res) => {
    const {userId} = req.params;
    const [courses] = await database.query(
        "SELECT * FROM courses WHERE is_active = 1");
    res.status(200).json({ success: true, courses });
};

module.exports = {getCourses};