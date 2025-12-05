const database = require("../data/database");
const verifyToken = require("../../middleware/verifyToken");

const addResource = verifyToken(async (req, res) => {
    try {
        const {courseId, title, type} = req.body;
        if (type === "link") {
            const url = req.body.url;
        } else if (type === "file") {
            const file = req.file.path;
        }
        const resource = await database.query("INSERT INTO resources (course_id, title, type, url) VALUES (?, ?, ?, ?)"
            , [courseId, title, type, url]);
        res.status(200).json({ success: true, resource });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = {addResource};