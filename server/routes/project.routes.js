import express from 'express';
const projectRouter = express.Router();
import protect from '../middleware/protect.js';

import {
  getAllProjects,
  getAllProjectsByManager,
  getOneProject,
  createProject,
  createProjectAsync,
  updateProject,
  deleteProject,
} from '../controllers/projects.controller.js';

// all project routes protected
projectRouter.use(protect);

projectRouter.get('/by/manager', getAllProjectsByManager);
projectRouter.post('/push', createProjectAsync);

projectRouter.route('/')
  .get(getAllProjects)
  .post(createProject);

projectRouter.route('/:id')
  .get(getOneProject)
  .put(updateProject)
  .delete(deleteProject);

export default projectRouter;
