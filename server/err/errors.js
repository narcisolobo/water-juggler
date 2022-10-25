/* 
These are errors that I have written to resemble normal Axios validation errors.

I did this so I could look in the same place for my error messages in React.
*/

const logEmailError = {
  errors: {
    email: {
      path: 'email',
      message: 'Email not found. Please register.',
    },
  },
};

const logPasswordError = {
  errors: {
    password: {
      path: 'password',
      message: 'Invalid credentials.',
    },
  },
};

const authError = {
  errors: {
    authentication: {
      path: 'authentication',
      message: 'Not authorized.',
    },
  },
};

export { logEmailError, logPasswordError, authError };