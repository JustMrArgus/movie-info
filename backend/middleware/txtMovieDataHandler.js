const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = multer({
  dest: path.join(__dirname, "../uploads/"),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/plain") {
      cb(null, true);
    } else {
      cb(new Error("Only .txt files are allowed"), false);
    }
  },
});

const uploadTxt = upload.single("file");

const parseTxtFile = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "File not uploaded", status: 0 });
  }

  const filePath = req.file.path;

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const blocks = raw.trim().split(/\n\s*\n/);

    const movies = blocks.map((block) => {
      const titleMatch = block.match(/Title:\s*(.+)/);
      const yearMatch = block.match(/Release Year:\s*(\d{4})/);
      const formatMatch = block.match(/Format:\s*(.+)/);
      const starsMatch = block.match(/Stars:\s*(.+)/);

      return {
        title: titleMatch ? titleMatch[1].trim() : null,
        year: yearMatch ? parseInt(yearMatch[1], 10) : null,
        format: formatMatch ? formatMatch[1].trim() : null,
        actors: starsMatch ? starsMatch[1].split(",").map((a) => a.trim()) : [],
      };
    });

    req.body = movies;
    fs.unlinkSync(filePath);
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error while processing file", status: 0 });
  }
};

module.exports = {
  uploadTxt,
  parseTxtFile,
};
