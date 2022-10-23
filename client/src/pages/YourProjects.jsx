import axios from 'axios';
import { SET_PROJECTS } from '../context/ProjectsContext';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import useProjectsContext from '../hooks/useProjectsContext';
import ProjectCard from '../components/ProjectCard';

const YourProjects = () => {
  const baseUrl = useOutletContext();
  const { projects, dispatch } = useProjectsContext();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(baseUrl);
        const { data } = response;
        dispatch({ type: SET_PROJECTS, payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects().catch(error => console.log(error));
  }, [dispatch, baseUrl, projects]);

  return (
    <div className="row g-2">
      <div className="col">
        <div className="card bg-light">
          <h5 className="card-header text-dark bg-primary">BACKLOG</h5>
          <div className="card-body">
            {projects &&
              projects
                .filter(p => p.status === 'backlog')
                .map(p => <ProjectCard key={p._id} project={p} />)}
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card bg-light">
          <h5 className="card-header text-dark bg-warning">IN PROGRESS</h5>
          <div className="card-body">
            {projects &&
              projects
                .filter(p => p.status === 'in progress')
                .map(p => <ProjectCard key={p._id} project={p} />)}
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card bg-light">
          <h5 className="card-header text-dark bg-success">COMPLETED</h5>
          <div className="card-body">
            {projects &&
              projects
                .filter(p => p.status === 'completed')
                .map(p => <ProjectCard key={p._id} project={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourProjects;
