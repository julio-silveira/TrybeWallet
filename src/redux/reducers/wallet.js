// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  data: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_DATA':
    return { };
  default:
    return state;
  }
}

export default wallet;
