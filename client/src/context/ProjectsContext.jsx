import { createContext, useReducer } from 'react';
export const ProjectsContext = createContext();
const SET_PROJECTS = 'SET_PROJECTS';
const CREATE_PROJECT = 'CREATE_PROJECT';
const UPDATE_PROJECT = 'UPDATE_PROJECT';
const DELETE_PROJECT = 'DELETE_PROJECT';

export { SET_PROJECTS, CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT };

export const projectsReducer = (projects, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PROJECTS: {
      return payload;
    }
    case CREATE_PROJECT: {
      return [...projects, payload];
    }
    case UPDATE_PROJECT: {
      const updatedProjects = projects.map(project => {
        if (project._id === payload._id) {
          return payload;
        } else {
          return project;
        }
      });
      return updatedProjects;
    }
    case DELETE_PROJECT: {
      return projects.filter(project => project._id !== payload._id);
    }
    default: {
      return projects;
    }
  }
};

export const ProjectsContextProvider = ({ children }) => {
  const [projects, dispatch] = useReducer(projectsReducer, []);

  return (
    <ProjectsContext.Provider value={{ projects, dispatch }}>
      {children}
    </ProjectsContext.Provider>
  );
};
