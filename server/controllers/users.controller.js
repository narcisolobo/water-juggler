import User from '../models/user.model.js';

/* 
  @desc    Get all users
  @route   GET /api/users
  @access  Public
*/
const getAllUsers = (_, res) => {
  console.log('*******************');
  console.log('IN GET ALL USERS');
  console.log('*******************');
  User.find({})
    .populate('projects')
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
};

export {
  getAllUsers,
};