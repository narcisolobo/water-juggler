import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';

const DeleteButton = ({ project, handleDelete }) => {
  return (
    <Button
      variant="danger"
      className="w-100 d-flex align-items-center"
      onClick={() => handleDelete(project)}>
      <Trash className="h5 mb-0 me-2" />
      Remove Project
    </Button>
  );
};

export default DeleteButton;
