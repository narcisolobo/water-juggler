import { createContext, useReducer, useEffect } from 'react';
export const AuthContext = createContext();

const initialUser = {
  username: null,
  id: '',
  token: null,
};

const authReducer = (user, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return initialUser;
    default:
      const err = new Error('Unexpected action type.');
      console.log(err);
      return user;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, initialUser);
  const baseUrl = 'http://localhost:8000/api/users';

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    if (loggedUser) {
      dispatch({ type: 'LOGIN', payload: loggedUser });
    }
  }, []);

  console.log(`Username: ${user.username}\nToken: ${user.token}\nID: ${user.id}`);

  return (
    <AuthContext.Provider value={{ user, dispatch, baseUrl }}>
      {children}
    </AuthContext.Provider>
  );
};
