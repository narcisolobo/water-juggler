import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useProjectsContext from './useProjectsContext';

const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const { dispatch: dispatchProjects } = useProjectsContext();

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    dispatchProjects({ type: 'SET_PROJECTS', payload: [] });
  };

  return logout;
};

export default useLogout;
