import express from 'express';
const userRouter = express.Router();

import {
  getAllUsers,
  updateUser,
  getOneUser,
  register,
  login,
  deleteUser
} from '../controllers/users.controller.js';

userRouter.get('/', getAllUsers);
userRouter.put('/:id', updateUser);
userRouter.get('/:id', getOneUser);
userRouter.delete('/:id', deleteUser);
userRouter.post('/register', register);
userRouter.post('/login', login);

export default userRouter;
