
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Adjust the path as necessary

// Register function
async function register(req, res) {
    const { name,email, password } = req.body;
  
    try {
  
  
      // Create a new user
      const user = new User({ name,email, password });
      await user.save();
      
      const JWT_SECRET = user.email + "xi"; 
      // Create a JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}

async function login(req, res) {
  const { name, password } = req.body;
  
  try {
    // Check if the user exists
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid ssusername or password' });
    }

    // Create a JWT token
    
    const JWT_SECRET = user.email + "xi"; 
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register, login };
