import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const useLoginReg = () => {
  const goTo = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, baseUrl } = useContext(AuthContext);

  const loginReg = async (requestBody, endpoint) => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await axios.post(`${baseUrl}/${endpoint}`, requestBody);
      const user = await response.data;

      // save user's email and token to local storage
      localStorage.setItem('user', JSON.stringify(user));

      // update auth context
      dispatch({ type: 'LOGIN', payload: user });
      setIsLoading(false);
      goTo('/projects')
      return false; // to close modal

    } catch (err) {
      setIsLoading(false);
      console.log(err);
      setErrors(err.response.data)
      return true; // to keep modal open
    }

  };

  return { loginReg, isLoading, errors, setErrors };
};

export default useLoginReg;
