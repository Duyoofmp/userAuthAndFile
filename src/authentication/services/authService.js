const jwt = require('jsonwebtoken');
const config = require('../../config/index');

exports.generateToken = (user) => {
  const token = jwt.sign({ id: user._id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });
  return token;
};

exports.verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const User = require('../models/user');

exports.getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw error;
  }
};



exports.createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
