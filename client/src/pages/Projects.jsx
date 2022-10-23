import { Outlet } from 'react-router-dom';

const Projects = () => {
  const baseUrl = 'http://localhost:8000/api/projects';

  return (
    <div className="container">
      <Outlet context={baseUrl} />
    </div>
  );
};

export default Projects;
