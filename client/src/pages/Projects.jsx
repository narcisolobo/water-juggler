import axios from 'axios';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import useProjectsContext from '../hooks/useProjectsContext';
import { UPDATE_PROJECT, DELETE_PROJECT } from '../context/ProjectsContext';

const Projects = () => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useProjectsContext();
  const baseUrl = 'http://localhost:8000/api/projects';

  const handleUpdate = project => {
    const newStatus = { status: '' };
    if (project.status === 'backlog') {
      newStatus.status = 'in progress';
    } else if (project.status === 'in progress') {
      newStatus.status = 'completed';
    }

    const updateProject = async () => {
      try {
        const updatedProject = await axios.put(
          `${baseUrl}/${project._id}`,
          newStatus,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        dispatch({ type: UPDATE_PROJECT, payload: updatedProject });
      } catch (error) {
        console.log(error);
      }
    };
    updateProject().catch(error => console.log(error));
  };

  const handleDelete = project => {
    const deleteProject = async () => {
      try {
        const deletedProject = await axios.delete(`${baseUrl}/${project._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        dispatch({ type: DELETE_PROJECT, payload: deletedProject });
      } catch (error) {
        console.log(error);
      }
    };
    deleteProject().catch(error => console.log(error));
  };

  return (
    <>
      <Container>
        <Outlet context={{ baseUrl, handleDelete, handleUpdate }} />
      </Container>
    </>
  );
};

export default Projects;
