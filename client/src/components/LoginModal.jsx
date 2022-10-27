import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import useLoginReg from '../hooks/useLoginReg';
import { EnvelopeFill, LockFill } from 'react-bootstrap-icons';

const LoginModal = ({ show, setShow }) => {
  const { loginReg, isLoading, errors, setErrors } = useLoginReg();
  const [validated, setValidated] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    setValidated(false);
    setErrors({});
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formState);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      await loginReg(formState, 'login')
        .then(res => {
          setFormState({
            email: '',
            password: '',
          })
          setShow(res)
        })
        .catch(err => setShow(err));
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title className='text-uppercase'>Login</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} validated={validated} noValidate>
        <Modal.Body>
          <div className="mb-3">
            <Form.Label htmlFor="email">Email Address:</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <EnvelopeFill />
              </InputGroup.Text>
              <Form.Control
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                What's your email?
              </Form.Control.Feedback>
            </InputGroup>
            {errors.email && (
              <div className="form-text text-danger">
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <Form.Label htmlFor="password">Password:</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <LockFill />
              </InputGroup.Text>
              <Form.Control
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Got a password?
              </Form.Control.Feedback>
            </InputGroup>
            {errors.password && (
              <div className="form-text text-danger">
                {errors.password.message}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            CANCEL
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading} className="text-uppercase">
            Login
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LoginModal;
