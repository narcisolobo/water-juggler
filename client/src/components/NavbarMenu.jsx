import { getPath } from '../utilities/location';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NewProjectModal from './NewProjectModal';
import { Container, Nav, Navbar } from 'react-bootstrap';

const NavbarMenu = ({ baseUrl }) => {
  const location = useLocation();
  const [path, setPath] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    setPath(getPath(location));
  }, [location]);

  return (
    <Navbar expand="md" bg="primary" variant="dark" className="mb-3">
      <NewProjectModal baseUrl={baseUrl} show={show} setShow={setShow} />
      <Container>
        <Navbar.Brand className="text-uppercase">Project Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${path === 'projects' ? 'active' : ''}`}
                to="/projects">
                Your Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  path === 'projects/new' ? 'active' : ''
                }`}
                onClick={() => setShow(true)}>
                Add a New Project
              </Link>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
