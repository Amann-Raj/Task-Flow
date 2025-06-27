const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskflow';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Swagger/OpenAPI setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Flow API',
      version: '1.0.0',
      description: 'API documentation for Task Flow project',
    },
    servers: [
      { url: 'http://localhost:5000' },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes for annotation
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Only connect and listen if not in test mode
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = app; 