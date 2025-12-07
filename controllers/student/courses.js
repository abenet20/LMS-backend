const database = require("../data/database");

const getCourses = async (req, res) => {
    try {
        // accept userId from route param, query string, or authenticated user (req.user.id)
        const rawId = req.params.userId || req.query.userId || req.user?.id;
        const userId = Number(rawId);
        // use 0 when no valid userId so LEFT JOIN won't match any row
        const uid = Number.isFinite(userId) && userId > 0 ? userId : 0;

        const [courses] = await database.query(
            `
            SELECT
                c.id,
                c.title,
                c.description,
                c.cover_image_url,
                c.youtube_embed_link,
                c.is_active,
                c.created_at,
                CASE WHEN e.id IS NULL THEN 0 ELSE 1 END AS enrolled,
                p.status AS progress_status
            FROM courses c
            LEFT JOIN enrollments e ON e.course_id = c.id AND e.user_id = ?
            LEFT JOIN progress p ON p.course_id = c.id AND p.user_id = ?
            WHERE c.is_active = 1
            ORDER BY c.created_at DESC
            `,
            [uid, uid]
        );

        // normalize enrolled to boolean and keep progress_status
        const normalized = courses.map(row => ({
            id: row.id,
            title: row.title,
            description: row.description,
            cover_image_url: row.cover_image_url,
            youtube_embed_link: row.youtube_embed_link,
            is_active: row.is_active,
            created_at: row.created_at,
            enrolled: Boolean(row.enrolled),
            progress_status: row.progress_status || null
        }));

        res.status(200).json({ success: true, courses: normalized });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getResources = async (req, res) => {
    try {
        const {courseId} = req.params;
        const [resources] = await database.query(
            "SELECT * FROM resources WHERE course_id = ?", [courseId]
        );
        res.status(200).json({ success: true, resources });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {getCourses, getResources};