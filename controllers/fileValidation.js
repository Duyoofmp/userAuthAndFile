function validateFile(req, res, next) {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      if (file.size > 1024 * 1024) {
        return res.status(400).json({ message: 'File size exceeds the limit' });
      }
      // If the file passes validation, proceed to the next middleware
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  module.exports = { validateFile };
  