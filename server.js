const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For hashing passwords
const User = require('D:\\artizon\\webdevelopment-main\\server.js'); // Adjust the path based on your file structure
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON requests

// MongoDB connection
const uri = process.env.MONGODB_URI; // Ensure you have your MongoDB URI in the .env file
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Signup route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const user = new User({ username, password: hashedPassword });

        // Save the user to the database
        await user.save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error creating user', error });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
