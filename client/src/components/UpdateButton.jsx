import { Button } from 'react-bootstrap';
import { ArrowRightCircle } from 'react-bootstrap-icons';

const UpdateButton = ({ project, handleUpdate }) => {
  return (
    <Button
      variant={project.status === 'backlog' ? 'warning' : 'success'}
      className="w-100 d-flex justify-content-between align-items-center"
      onClick={() => handleUpdate(project)}>
      {project.status === 'backlog' ? 'Start Project' : 'Move to Completed'}
      <ArrowRightCircle className="h5 mb-0" />
    </Button>
  );
};

export default UpdateButton;
