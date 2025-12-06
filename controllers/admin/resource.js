const database = require("../data/database");
const verifyToken = require("../../middleware/verifyToken");

const addResource = async (req, res) => {
    try {
        const {courseId, title, type} = req.body;
        let filePath = null;
        if (req.file && req.file.path) {
            filePath = req.file.path;
        } else if (req.files) {
            if (req.files.file && req.files.file[0]) filePath = req.files.file[0].path;
            else if (req.files.resource && req.files.resource[0]) filePath = req.files.resource[0].path;
        }
        if (!filePath) return res.status(400).json({ success: false, message: "No resource file uploaded" });
        const url = filePath;
        const resource = await database.query("INSERT INTO resources (course_id, title, type, url) VALUES (?, ?, ?, ?)"
            , [courseId, title, type, url]);
        res.status(200).json({ success: true, resource });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteResource = async (req, res) => {
    try {
        const {resourceId} = req.body;
        const resource = await database.query("DELETE FROM resources WHERE id = ?", [resourceId]);
        res.status(200).json({ success: true, resource });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateResource = async (req, res) => {
    try {
        const {resourceId, title, type} = req.body;
        const resource = await database.query("UPDATE resources SET title = ?, type = ? WHERE id = ?", [title, type, resourceId]);
        res.status(200).json({ success: true, resource });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getResources = async (req, res) => {
    try{
        const [resources] = await database.query("SELECT * FROM resources WHERE course_id = ? AND is_active = 1", [req.params.courseId]);
        res.status(200).json({ success: true, resources });
    } catch (error){
        res.status(500).json({ success: false, message: "there are no resources found" });
    }
};

module.exports = {addResource, deleteResource, updateResource, getResources};