import axios from 'axios';
import { useReducer, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import useProjectsContext from '../hooks/useProjectsContext';
import { CREATE_PROJECT } from '../context/ProjectsContext';
import {
  INPUT_CHANGE,
  RESET_FORM,
  initialForm,
  formReducer,
} from '../utilities/formReducer';

const NewProjectModal = ({ baseUrl, show, setShow }) => {
  const { dispatch } = useProjectsContext();
  const [errors, setErrors] = useState({});
  const [formState, dispatchForm] = useReducer(formReducer, initialForm);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(baseUrl, formState);
      const { data } = response;
      dispatch({ type: CREATE_PROJECT, payload: data });
      setErrors({});
      setShow(false);
      dispatchForm({ type: RESET_FORM, payload: initialForm });
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.errors);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>PLAN A NEW PROJECT</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-3">
            <Form.Label htmlFor="name">Project Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              id="name"
              className={errors.name ? 'is-invalid' : ''}
              value={formState.name}
              onChange={e =>
                dispatchForm({
                  type: INPUT_CHANGE,
                  payload: { name: e.target.name, value: e.target.value },
                })
              }
            />
            {errors.name && (
              <span className="form-text text-warning">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="dueDate">Project Name:</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              id="dueDate"
              className={errors.dueDate ? 'is-invalid' : ''}
              value={formState.dueDate}
              onChange={e =>
                dispatchForm({
                  type: INPUT_CHANGE,
                  payload: { name: e.target.name, value: e.target.value },
                })
              }
            />
            {errors.dueDate && (
              <span className="form-text text-warning">
                {errors.dueDate.message}
              </span>
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
