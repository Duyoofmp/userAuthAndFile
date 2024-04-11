const fs = require('fs');
const path = require('path');
const File = require('../models/file');

exports.saveFile = async (fileDetails) => {
  try {
    // Save file details to MongoDB using Mongoose model
    const savedFile = await File.create(fileDetails);
    return savedFile;
  } catch (error) {
    console.error('Error saving file to database:', error);
    throw error;
  }
};

exports.getFileStream = (filename) => {
  // Get file stream for downloading
  const filePath = path.join('uploads', filename);
  const fileStream = fs.createReadStream(filePath);
  return fileStream;
};
