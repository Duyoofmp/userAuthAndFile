const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

// Upload file endpoint
router.post('/upload', upload.single('file'), fileController.uploadFile);

// Download file endpoint
router.get('/download/:filename', fileController.downloadFile);

module.exports = router;
