import axios from 'axios';
import { UPDATE_PROJECT, DELETE_PROJECT } from '../context/ProjectsContext';
import { format } from 'date-fns';
import { useOutletContext } from 'react-router-dom';
import useProjectsContext from '../hooks/useProjectsContext';
import UpdateButton from './UpdateButton';
import DeleteButton from './DeleteButton';

const ProjectCard = ({ project }) => {
  const baseUrl = useOutletContext();
  const { dispatch } = useProjectsContext();

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
          newStatus
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
        const deletedProject = await axios.delete(`${baseUrl}/${project._id}`);
        dispatch({ type: DELETE_PROJECT, payload: deletedProject });
      } catch (error) {
        console.log(error);
      }
    };
    deleteProject().catch(error => console.log(error));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{project.name}</h5>
        <p>
          <strong>Due: </strong>
          {format(new Date(project.dueDate), 'cccc, MMMM d, yyyy')}
        </p>
        {project.status === 'completed' ? (
          <DeleteButton project={project} handleDelete={handleDelete} />
        ) : (
          <UpdateButton project={project} handleUpdate={handleUpdate} />
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
