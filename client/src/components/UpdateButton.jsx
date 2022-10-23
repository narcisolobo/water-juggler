import { ArrowRightCircle } from 'react-bootstrap-icons';

const UpdateButton = ({ project, handleUpdate }) => {

  return (
    <button
      className={`btn text-dark w-100 d-flex justify-content-between align-items-center ${
        project.status === 'backlog' ? 'btn-warning' : 'btn-success'
      }`}
      onClick={() => handleUpdate(project)}>
      {project.status === 'backlog' ? 'Start Project' : 'Move to Completed'}
      <ArrowRightCircle className="h5 mb-0" />
    </button>
  );
};

export default UpdateButton;
