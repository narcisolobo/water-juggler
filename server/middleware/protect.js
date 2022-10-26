import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();
const { JWT_SECRET } = process.env;

const error = {
  message: 'Authorization token must be provided.',
};

const protect = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    console.log(error);
    return res.status(401).json(error);
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    req.userId = await User.findById(id).select('_id');
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ err, error });
  }
};

export default protect;
