import { Outlet } from "react-router-dom";

const Projects = () => {
  return (
    <div className="container">
      <h1>Projects</h1>
      <Outlet />
    </div>
  )
}

export default Projects;