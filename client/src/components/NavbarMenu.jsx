import logo from '../logo.png';
import LoginModal from './LoginModal';
import useLogout from '../hooks/useLogout';
import RegisterModal from './RegisterModal';
import { getPath } from '../utilities/location';
import NewProjectModal from './NewProjectModal';
import { AuthContext } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const logoStyle = {
  width: '40px',
  marginBottom: '5px',
};

const NavbarMenu = () => {
  const logout = useLogout();
  const location = useLocation();
  const [path, setPath] = useState('');
  const { user } = useContext(AuthContext);
  const [showNew, setShowNew] = useState(false);
  const [showReg, setShowReg] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const baseUrl = 'http://localhost:8000/api/projects';

  useEffect(() => {
    console.log(user);
    setPath(getPath(location));
  }, [location, user]);

  const handleLogout = () => {
    logout();
  }

  return (
    <Navbar expand="md" bg="secondary" variant="dark" className="p-1 mb-3 shadow">
      <NewProjectModal baseUrl={baseUrl} show={showNew} setShow={setShowNew} />
      <RegisterModal show={showReg} setShow={setShowReg} />
      <LoginModal show={showLog} setShow={setShowLog} />
      <Container>
        <Navbar.Brand className="text-uppercase" href="/">
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
          {user && (
            <>
              <Navbar.Text>{user.username}</Navbar.Text>
              <Nav className="ms-auto">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      path === 'projects' ? 'active' : ''
                    }`}
                    to="/projects">
                    Your Projects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" onClick={() => setShowNew(true)}>
                    Add a New Project
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" onClick={handleLogout}>
                    Log Out
                  </Link>
                </li>
              </Nav>
            </>
          )}
          {!user && (
            <Nav className="ms-auto">
              <li className="nav-item">
                <Link className="nav-link" onClick={() => setShowReg(true)}>
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={() => setShowLog(true)}>
                  Login
                </Link>
              </li>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarMenu;
