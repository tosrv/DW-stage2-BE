import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "src/uploads",
  filename: function (req, file, cb) {
    const formatFile = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + formatFile + path.extname(file.originalname)
    );
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLocaleLowerCase();
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("JPG/PNG"));
    }
    cb(null, true);
  },
});