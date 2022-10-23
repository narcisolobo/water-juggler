import express from 'express';
const userRouter = express.Router();

import {
  getAllUsers,
} from '../controllers/users.controller.js';

userRouter.route('/')
  .get(getAllUsers);
  // .post(createUser);

  
// userRouter.route('/:id')
//   .get(getOneUser)
//   .put(updateUser)
//   .delete(deleteUser);

export default userRouter;
