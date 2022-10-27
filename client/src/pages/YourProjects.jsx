import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { useContext, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import { AuthContext } from '../context/AuthContext';
import { SET_PROJECTS } from '../context/ProjectsContext';
import useProjectsContext from '../hooks/useProjectsContext';

const YourProjects = () => {
  const { user } = useContext(AuthContext);
  const { baseUrl } = useOutletContext();
  const { projects, dispatch } = useProjectsContext();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${baseUrl}/by/manager`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const { data } = response;
        dispatch({ type: SET_PROJECTS, payload: data });
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchProjects().catch(error => console.log(error));
    }
  }, [dispatch, baseUrl, projects, user]);

  return (
    <Row className="g-2">
      <Col>
        <Card bg="secondary" className="shadow">
          <Card.Header className="text-light h5">BACKLOG</Card.Header>
          <Card.Body className="pb-2">
            {projects &&
              projects
                .filter(p => p.status === 'backlog')
                .map(p => <ProjectCard key={p._id} project={p} />)}
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card bg="warning" className="shadow">
          <Card.Header className="text-light bg-warning h5">
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
        <Card bg="success" className="shadow">
          <Card.Header className="text-light bg-success h5">
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
