import { Trash } from 'react-bootstrap-icons';

const DeleteButton = ({ project, handleDelete }) => {

  return (
    <button
      className="btn text-dark w-100 d-flex align-items-center btn-danger"
      onClick={() => handleDelete(project)}>
      <Trash className="h5 mb-0 me-2" />
      Remove Project
    </button>
  );
};

export default DeleteButton;
