const database = require("../data/database");

const addResource = async (req, res) => {
  try {
    const { courseId, title, description, category ,type } = req.body;

    // Make sure file was uploaded
    if (!req.fileUrl) {
      return res.status(400).json({
        success: false,
        message:
          "File missing or upload failed. Ensure frontend field name is 'file' and middleware sets req.fileUrl",
      });
    }

    const fileUrl = req.fileUrl; // URL from Supabase or wherever you uploaded

    // Insert into DB
    const resource = await database.query(
      "INSERT INTO resources (title, description, category, type, url) VALUES (?, ?, ?, ?, ?)",
      [title,description, category, type, fileUrl]
    );

    res.status(200).json({ success: true, resource });
  } catch (error) {
    console.error(error);
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

module.exports = {addResource, deleteResource, updateResource};