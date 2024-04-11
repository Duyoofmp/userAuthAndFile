const multer = require('multer');

function uploadFile(req, res) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const downloadLink = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    res.status(200).json({ message: 'File uploaded successfully', downloadLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { uploadFile };
