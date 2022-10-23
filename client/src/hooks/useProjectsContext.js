import { ProjectsContext } from '../context/ProjectsContext';
import { useContext } from 'react';

const useProjectsContext = () => {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw Error(
      'useProjectsContext must be used inside a ProjectsContextProvider'
    );
  }

  return context;
};

export default useProjectsContext;