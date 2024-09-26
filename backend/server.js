const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipe');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI 

// Database Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);

// Server Listening
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
