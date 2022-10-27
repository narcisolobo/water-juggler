import { createContext, useReducer, useEffect } from 'react';
export const AuthContext = createContext();

const getUser = () => {
  const userString = localStorage.getItem('user');
  // console.log(`userString: ${userString}`);
  const user = JSON.parse(userString);
  // console.log(`User: ${user.username}`);
  return user ? user : null;
}

const authReducer = (user, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      const err = new Error('Unexpected action type.');
      console.log(err);
      return user;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, getUser());
  const baseUrl = 'http://localhost:8000/api/users';

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    if (loggedUser) {
      dispatch({ type: 'LOGIN', payload: loggedUser });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, dispatch, baseUrl }}>
      {children}
    </AuthContext.Provider>
  );
};
