import Project from '../models/project.model.js';
import User from '../models/user.model.js';

/* 
  @desc    Get all projects
  @route   GET /api/projects
  @access  Private
*/
const getAllProjects = (_, res) => {
  Project.find({})
    .sort({ dueDate: 1 })
    .populate('manager')
    .then(projects => res.status(200).json(projects))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
};

/* 
  @desc    Get all projects by Manager
  @route   GET /api/projects/by/manager
  @access  Private
*/
const getAllProjectsByManager = (req, res) => {
  const { userId } = req;
  Project.find({ manager: userId })
    .then(projects => res.status(200).json(projects))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
};

/* 
  @desc    Get one project
  @route   GET /api/projects/:id
  @access  Private
*/
const getOneProject = (req, res) => {
  const { id } = req.params;
  Project.findById(id)
    .populate('manager')
    .then(project => res.status(200).json(project))
    .catch(err => res.status(400).json(err));
};

/* 
  @desc    Create project
  @route   POST /api/projects
  @access  Private
*/
const createProject = (req, res) => {
  Project.create(req.body)
    .then(project => {
      res.status(201).json(project);
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
  @desc    Create project, push project to user
  @route   POST /api/projects/push
  @access  Private
*/
const createProjectAsync = async (req, res) => {
  try {
    const { userId } = req;
    const project = await Project.create(req.body);
    console.log(`Project ID: ${project._id}`);
    console.log(`Manager ID: ${userId}`);
    const manager = await User.findByIdAndUpdate(
      userId,
      { $push: { projects: project._id } },
      { new: true }
    );
    res.status(200).json({ project, manager });
  } catch (err) {
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
  }
};

/* 
  @desc    Update project
  @route   PUT /api/projects/:id
  @access  Private
*/

const updateProject = (req, res) => {
  const { id } = req.params;
  Project.findByIdAndUpdate(id, req.body, { new: true })
    .then(project => res.status(200).json(project))
    .catch(err => res.status(400).json(err));
};

/* 
  @desc    Delete project
  @route   DELETE /api/projects/:id
  @access  Private
*/

const deleteProject = (req, res) => {
  const { id } = req.params;
  Project.findByIdAndDelete(id)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json(err));
};

export {
  getAllProjects,
  getAllProjectsByManager,
  getOneProject,
  createProject,
  createProjectAsync,
  updateProject,
  deleteProject,
};
