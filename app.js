// app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const multer = require('multer');
const validateFile = require('./controllers/fileValidation');
const uploadFile = require('./controllers/uploadController.');


const upload = multer({ dest: 'uploads/' });

// Middleware

app.use(express.json());

app.use('/api/auth', authRoutes);

app.post('/api/upload', upload.single('file'), validateFile, uploadFile);

// File Download Endpoint
app.get('/api/download/:filename', downloadFile);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
