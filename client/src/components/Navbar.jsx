import { getPath } from '../utilities/location';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(getPath(location));
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <div className="container">
        <Link className="navbar-brand" to="/projects">
          Project Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${path === 'projects' ? 'active' : ''}`}
                to="/projects">
                Your Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${path === 'projects/new' ? 'active' : ''}`}
                to="/projects/new">
                Add a Project
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
