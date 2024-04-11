const authService = require('../services/authService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await authService.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const newUser = await authService.createUser({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await authService.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not provided' });
    }

    // Verify refresh token
    jwt.verify(refreshToken, config.refreshTokenSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      // Generate new JWT token
      const token = jwt.sign({ id: user._id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });

      res.status(200).json({ message: 'Token refreshed successfully', token });
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
