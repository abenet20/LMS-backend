const path = require("path");
const supabase = require("../controllers/data/supabase");
const multer = require("multer");

const memoryStorage = multer.memoryStorage();

const diskStorage = (uploadPath) =>
  multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
  });


function handleUpload({ storageType = "disk", uploadPath, fieldName = "file" } = {}) {
  if (storageType === "disk" && !uploadPath) {
    throw new Error("uploadPath is required for disk storage");
  }

  const multerStorage = storageType === "disk" ? diskStorage(uploadPath) : memoryStorage;
  const upload = multer({ storage: multerStorage });

  return async (req, res, next) => {
    try {
      // Use multer single file upload
      upload.single(fieldName)(req, res, async (err) => {
        if (err) return next(err);

        // If Supabase storage, upload the file
        if (storageType === "supabase" && req.file) {
          const file = req.file;
          const fileName = Date.now() + "-" + file.originalname;
          const bucketName = "uploads";

          const { error } = await supabase.storage
            .from(bucketName)
            .upload(fileName, file.buffer, {
              cacheControl: "3600",
              upsert: false,
              contentType: file.mimetype,
            });

          if (error) return next(error);

          const { publicUrl, error: urlError } = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName);

          if (urlError) return next(urlError);

          // Attach the public URL to req for downstream usage
          req.fileUrl = publicUrl;
        } else if (storageType === "disk" && req.file) {
          req.fileUrl = req.file.path; // local path
        }

        next();
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = handleUpload;