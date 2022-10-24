import { Card } from 'react-bootstrap';
import { format } from 'date-fns';
import { useOutletContext } from 'react-router-dom';
import UpdateButton from './UpdateButton';
import DeleteButton from './DeleteButton';

const ProjectCard = ({ project }) => {
  const today = new Date();
  const { handleDelete, handleUpdate } = useOutletContext();

  return (
    <Card bg='white' className="mb-2 shadow">
      <Card.Body>
        <Card.Title className='text-dark'>{project.name}</Card.Title>
        <Card.Text
          className={`
            ${new Date(project.dueDate) < today ? 'text-danger' : 'text-dark'}
          `}>
          <strong>Due: </strong>
          {format(new Date(project.dueDate), 'cccc, MMMM d, yyyy')}
        </Card.Text>
        {project.status === 'completed' ? (
          <DeleteButton project={project} handleDelete={handleDelete} />
        ) : (
          <UpdateButton project={project} handleUpdate={handleUpdate} />
        )}
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
