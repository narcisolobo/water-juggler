import axios from 'axios';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useOutletContext } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { SET_PROJECTS } from '../context/ProjectsContext';
import useProjectsContext from '../hooks/useProjectsContext';

const YourProjects = () => {
  const { baseUrl } = useOutletContext();
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
    <Row className="g-2">
      <Col>
        <Card bg="primary" className='shadow'>
          <Card.Header className="text-dark bg-primary h5">BACKLOG</Card.Header>
          <Card.Body className="pb-2">
            {projects &&
              projects
                .filter(p => p.status === 'backlog')
                .map(p => <ProjectCard key={p._id} project={p} />)}
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card bg="warning" className='shadow'>
          <Card.Header className="text-dark bg-warning h5">
            IN PROGRESS
          </Card.Header>
          <Card.Body className="pb-2">
            {projects &&
              projects
                .filter(p => p.status === 'in progress')
                .map(p => <ProjectCard key={p._id} project={p} />)}
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card bg="success" className='shadow'>
          <Card.Header className="text-dark bg-success h5">
            COMPLETED
          </Card.Header>
          <Card.Body className="pb-2">
            {projects &&
              projects
                .filter(p => p.status === 'completed')
                .map(p => <ProjectCard key={p._id} project={p} />)}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default YourProjects;
