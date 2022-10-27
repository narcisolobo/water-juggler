import Container from 'react-bootstrap/Container';
import logo from '../logo.png';

const containerStyles = {
  minHeight: '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgb(120,194,173)'
}

const logoStyles = {
  width: '400px'
}

const titleStyles = {
  fontSize: '4em',
  color: 'white'
}

const ProjectsHome = () => {
  return <Container style={containerStyles}>
    <div className='text-center'>
      <img src={logo} alt="Project Manager" style={logoStyles} />
      <h1 style={titleStyles}>PROJECT MANAGER</h1>
    </div>
  </Container>;
};

export default ProjectsHome;
