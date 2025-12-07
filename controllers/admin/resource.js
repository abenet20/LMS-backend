const database = require("../data/database");
const verifyToken = require("../../middleware/verifyToken");

const addResource = async (req, res) => {
    try {
        const {courseId, title, type} = req.body;
        // normalize multer / cloudinary file object to a string URL
        let fileObj = null;
        if (req.file) fileObj = req.file;
        else if (req.files) {
            if (req.files.file && req.files.file[0]) fileObj = req.files.file[0];
            else if (req.files.resource && req.files.resource[0]) fileObj = req.files.resource[0];
        }

        if (!fileObj) return res.status(400).json({ success: false, message: "No resource file uploaded" });

        // prefer common URL fields returned by cloudinary/multer-storage-cloudinary
        let url = null;
        if (typeof fileObj === 'string') {
            url = fileObj;
        } else if (fileObj.path && typeof fileObj.path === 'string') {
            url = fileObj.path;
        } else if (fileObj.secure_url) {
            url = fileObj.secure_url;
        } else if (fileObj.url) {
            url = fileObj.url;
        } else if (fileObj.location) {
            url = fileObj.location;
        } else if (fileObj.public_id) {
            // best-effort fallback: include public_id so client can construct URL if needed
            url = String(fileObj.public_id);
        } else {
            // last resort: stringify the object so it's not logged as [object Object]
            url = JSON.stringify(fileObj);
        }
        const [result] = await database.query(
            "INSERT INTO resources (course_id, title, type, url) VALUES (?, ?, ?, ?)",
            [courseId, title, type, url]
        );
        const insertedId = result.insertId || null;
        res.status(200).json({
            success: true,
            resource: { id: insertedId, course_id: courseId, title, type, url }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteResource = async (req, res) => {
    try {
        const {resourceId} = req.body;
        const [result] = await database.query("DELETE FROM resources WHERE id = ?", [resourceId]);
        res.status(200).json({ success: true, affectedRows: result.affectedRows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateResource = async (req, res) => {
    try {
        const {resourceId, title, type} = req.body;
        const [result] = await database.query("UPDATE resources SET title = ?, type = ? WHERE id = ?", [title, type, resourceId]);
        res.status(200).json({ success: true, affectedRows: result.affectedRows });
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
        console.log(error);
    }
};

module.exports = {addResource, deleteResource, updateResource, getResources};