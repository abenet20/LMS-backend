const database = require("../data/database");

const addCourse = async (req, res) => {
    try {
    const {title, description, embedLink} = req.body;
    let imgPath = null;
    if (req.file && req.file.path) {
        imgPath = req.file.path;
    } else if (req.files) {
        if (req.files.courseImage && req.files.courseImage[0]) imgPath = req.files.courseImage[0].path;
        else if (req.files.image && req.files.image[0]) imgPath = req.files.image[0].path;
    }
    if (!imgPath) return res.status(400).json({ success: false, message: "No course image uploaded" });

    const course = await database.query("INSERT INTO courses (title, description, cover_image_url ,youtube_embed_link) VALUES (?, ?, ?, ?)", [title, description, imgPath, embedLink]);
    res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



const deleteCourse = async (req, res) => {
    try {
        const {courseId} = req.body;
        const course = await database.query("DELETE FROM courses WHERE id = ?", [courseId]);
        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateCourse = async (req, res) => {
    try {
        const {courseId, title, description, embedLink} = req.body;
        const course = await database.query("UPDATE courses SET title = ?, description = ? WHERE id = ?", [title, description, courseId]);
        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getCourses = async (req, res) => {
    try{
        const [courses] = await database.query(
            "SELECT * FROM courses LEFT JOIN resources ON courses.id = resources.course_id LEFT JOIN enrollments ON courses.id = enrollments.course_id LEFT JOIN progress ON courses.id = progress.course_id WHERE courses.is_active = 1");
        res.status(200).json({ success: true, courses });
    } catch (error){
        res.status(500).json({ success: false, message: "there are no courses found" });
    }
};


module.exports = {addCourse, deleteCourse, getCourses, updateCourse};