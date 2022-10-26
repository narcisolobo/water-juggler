import { getPath } from '../utilities/location';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NewProjectModal from './NewProjectModal';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from '../logo.png';
import RegisterModal from './RegisterModal';

const logoStyle = {
  width: '40px',
  marginBottom: '5px',
};

const NavbarMenu = ({ baseUrl }) => {
  const location = useLocation();
  const [path, setPath] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showReg, setShowReg] = useState(false);
  const [showLog, setShowLog] = useState(false);

  useEffect(() => {
    setPath(getPath(location));
  }, [location]);

  return (
    <Navbar expand="md" bg="primary" variant="dark" className="p-1 mb-3">
      <NewProjectModal baseUrl={baseUrl} show={showNew} setShow={setShowNew} />
      <RegisterModal show={showReg} setShow={setShowReg} />
      <Container>
        <Navbar.Brand className="text-uppercase">
          <img
            src={logo}
            alt="Project Manager Logo"
            style={logoStyle}
            className="me-2"
          />
          Project Manager
        </Navbar.Brand>
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
              <Link className="nav-link" onClick={() => setShowReg(true)}>
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={() => setShowNew(true)}>
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
