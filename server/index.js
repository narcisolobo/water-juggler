import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

import connectDb from './config/mongoose.config.js';
connectDb();

// MIDDLEWARE
// parse json post requests
// handle cross origin requests
// parse cookies from requests
import cors from 'cors';
app.use(express.json(), cors());

// bring in routes
import userRouter from './routes/user.routes.js';
app.use('/api/users', userRouter);
import projectRouter from './routes/project.routes.js';
app.use('/api/projects', projectRouter);

import chalk from 'chalk';
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(chalk.blue(`LISTENING ON PORT ${port}`))
);