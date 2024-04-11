const express = require('express');
const app = express();
const connectDB = require('./src/database/index');
const authRoutes = require('./src/authentication/routes/authRoutes');
const crudRoutes = require('./src/crud/routes/crudRoutes');
const fileRoutes = require('./src/file/routes/fileRoutes');
const config = require('./src/config');
const swaggerUi = require('swagger-ui-express');

const swagger=require('./swagger.json')

// Connect to MongoDB database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/crud', crudRoutes);
app.use('/file', fileRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

// Start the server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
