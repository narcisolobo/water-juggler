import express from 'express';
const projectRouter = express.Router();

import {
  getAllProjects,
  getAllProjectsByManager,
  getOneProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projects.controller.js';
  
projectRouter.get('/managers/:id', getAllProjectsByManager);

projectRouter.route('/')
  .get(getAllProjects)
  .post(createProject);

  
projectRouter.route('/:id')
  .get(getOneProject)
  .put(updateProject)
  .delete(deleteProject);

export default projectRouter;
