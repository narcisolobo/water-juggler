const INPUT_CHANGE = 'INPUT_CHANGE';
const RESET_FORM = 'RESET_FORM';

const initialForm = {
  name: '',
  dueDate: '',
};

const formReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    case RESET_FORM:
      return {
        payload,
      };
    default:
      throw new Error('Unexpected action type.');
  }
};

export { INPUT_CHANGE, RESET_FORM, initialForm, formReducer };
