import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();
const port = 3000;

// Cors
const corsOptions = {
  origin: "http://127.0.0.1:5001",
  optionsSuccessStatus: 200,
};

// Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

// Multer
const storage = multer.diskStorage({
  destination: "src/upload",
  filename: function (req, file, cb) {
    const formatFile = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + formatFile + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLocaleLowerCase();
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("JPG/PNG only"));
    }
    cb(null, true);
  },
});

app.use(cors());
app.use(limiter);

app.post("/upload-profile-picture", upload.single("profile"), (req, res) => {
  if (!req.file) res.status(400).json({ message: "profile is required" });

  const profileFile = { filename: req.file?.filename };

  res.json({
    message: "Success",
    profile: profileFile,
  });
});

app.get("/test", (req, res) => {
  res.json({message: "Success!"});
});

app.listen(port, () => console.log("Server is running"));
