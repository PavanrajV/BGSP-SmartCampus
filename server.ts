import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import multer from "multer";
import * as xlsx from "xlsx";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  // Multer setup for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Bulk Upload Students (Excel)
  app.post("/api/admin/upload-students", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);

      // In a real app, you'd save this to Firestore
      // For now, we'll just return the data
      res.json({ message: "Students uploaded successfully", count: data.length, data });
    } catch (error) {
      res.status(500).json({ error: "Failed to parse Excel file" });
    }
  });

  // Upload Study Materials
  app.post("/api/staff/upload-note", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Return the file path (in a real app, you'd save this to Firestore)
    res.json({ 
      message: "Note uploaded successfully", 
      fileUrl: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname 
    });
  });

  // Serve uploaded files
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
