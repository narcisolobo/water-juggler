import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import generateToken from '../jwt/generateToken.js';
import { logEmailError, logPasswordError } from '../err/errors.js';

/* 
  @desc    Get all users (dev purposes only)
  @route   GET /api/users
  @access  Public
*/
const getAllUsers = (_, res) => {
  User.find({})
    .populate('projects')
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
};

/* 
  @desc    Update User (dev purposes only)
  @route   PUT /api/users/:id
  @access  Public
*/
const updateUser = (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err));
};

/* 
  @desc    Get One User (dev purposes only)
  @route   GET /api/users/:id
  @access  Public
*/
const getOneUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .populate('projects')
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err));
};

/* 
  @desc    Register a user
  @route   POST /api/users/register
  @access  Public
*/
const register = (req, res) => {
  // Register a user and catch any errors.
  // Errors include all Mongoose validation errors.
  User.create(req.body)
    .then(user => {
      // Success. Generate JWT Token.
      const token = generateToken(user._id);
      const username = user.username;
      const id = user._id;
      // Log the user in as a courtesy.
      // Send the user and the token.
      res.status(201).json({ username, token, id });
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        const errors = {};
        Object.keys(err.errors).forEach(key => {
          errors[key] = {
            path: err.errors[key].path,
            message: err.errors[key].message,
            value: err.errors[key].value,
          };
        });
        console.log(errors);
        res.status(400).json(errors);
      }
    });
};

/* 
  @desc    Authenticate a user
  @route   POST /api/users/login
  @access  Public
*/
const login = async (req, res) => {
  // Destructure the email and password from the request body.
  const { email, password } = req.body;

  // Try/catch block in async function.
  try {
    // Find user in database.
    const user = await User.findOne({ email });

    // If user not found, respond with error.
    if (!user) {
      return res.status(400).json(logEmailError);
    }

    // Compare password given vs. password in database.
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    // If password incorrect, respond with error.
    if (!passwordIsCorrect) {
      return res.status(400).json(logPasswordError);
    }

    // Success. Generate JWT Token.
    const token = generateToken(user._id);
    const username = user.username;
    const id = user._id;

    // Log the user in. Send the user and the token.
    res.status(200).json({ username, token, id });
  } catch (err) {
    res.status(400).json(err);
  }
};

/* 
  @desc    Delete a user
  @route   DELETE /api/users/:id
  @access  Public
*/
const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(deletedUser => res.status(200).json(deletedUser))
    .catch(err => console.log(err));
}

export { getAllUsers, updateUser, getOneUser, register, login, deleteUser };
