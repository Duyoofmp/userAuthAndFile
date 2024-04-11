const fileService = require('../services/fileService');

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'File not provided' });
    }

    // Save file details to database
    const savedFile = await fileService.saveFile({
      filename: file.filename,
      path: file.path,
      size: file.size
    });

    res.status(201).json({ message: 'File uploaded successfully', file: savedFile });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const filename = req.params.filename;

    // Get file stream from file service
    const fileStream = await fileService.getFileStream(filename);

    // Set response headers
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Pipe file stream to response
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
