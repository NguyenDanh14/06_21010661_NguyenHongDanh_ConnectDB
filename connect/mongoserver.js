// connectDB.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection configuration
const dbURI = 'mongodb://localhost:27017/myDB';

// Connect to MongoDB using Mongoose
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB database!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define the User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
});

const User = mongoose.model('user', userSchema);

// API to get user data
app.get('/api/data', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  }
});

// API to register an account
app.post('/api/register', async (req, res) => {
  const { name, pass } = req.body;

  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const newUser = new User({ name, pass });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Database error during registration' });
  }
});

// API to update user information
app.put('/api/user/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, pass } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, pass },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Database error while updating user' });
  }
});

// API to delete a user
app.delete('/api/users/delete/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Database error while deleting user' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});