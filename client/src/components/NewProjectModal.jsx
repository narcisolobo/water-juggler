import axios from 'axios';
import { Calendar3 } from 'react-bootstrap-icons';
import { PencilSquare } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import useProjectsContext from '../hooks/useProjectsContext';
import { CREATE_PROJECT } from '../context/ProjectsContext';

const NewProjectModal = ({ baseUrl, show, setShow }) => {
  const { dispatch } = useProjectsContext();
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    dueDate: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    }

    try {
      const response = await axios.post(baseUrl, formState);
      const { data } = response;
      dispatch({ type: CREATE_PROJECT, payload: data });
      setShow(false);
      setFormState({
        name: '',
        dueDate: '',
      });
      setErrors({});
    } catch (err) {
      setErrors(err.response.data);
      if (errors.name) {
        setFormState({
          ...formState,
          name: errors.name.value
        })
      }
      if (errors.dueDate) {
        setFormState({
          ...formState,
          dueDate: errors.name.value
        })
      }
    }
  };

  const handleChange = e => {
    setValidated(false);
    setErrors({});
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>PLAN A NEW PROJECT</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} validated={validated} noValidate>
        <Modal.Body>
          <div className="mb-3">
            <Form.Label htmlFor="name">Project Name:</Form.Label>
            <InputGroup className="has-validation">
              <InputGroup.Text>
                <PencilSquare />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="name"
                id="name"
                value={formState.name}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                What's the name of your project?
              </Form.Control.Feedback>
            </InputGroup>
            {errors.name && (
              <div className="form-text text-danger">{errors.name.message}</div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="dueDate">Due Date:</Form.Label>
            <InputGroup className="has-validation">
              <InputGroup.Text>
                <Calendar3 />
              </InputGroup.Text>
              <Form.Control
                type="date"
                name="dueDate"
                id="dueDate"
                value={formState.dueDate}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                When is your project due?
              </Form.Control.Feedback>
            </InputGroup>
            {errors.dueDate && (
              <div className="form-text text-danger">
                {errors.dueDate.message}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            CANCEL
          </Button>
          <Button variant="success" type="submit">
            CREATE
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewProjectModal;
