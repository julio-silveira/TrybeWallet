// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: -1,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_CURRENCY':
    return { ...state, currencies: Object.keys(action.payload.data) };
  case 'FAILED_REQUEST':
    return { ...state, error: action.payload };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'DEL_EXPENSE': {
    const updatedExpenses = state.expenses
      .filter((expense) => expense.id !== action.idToDelete);
    return { ...state, expenses: updatedExpenses }; }
  case 'START_EDIT_EXPENSE': {
    return {
      ...state,
      editor: true,
      idToEdit: action.idToEdit,
    };
  }
  case 'FINISH_EDIT_EXPENSE': {
    const expenses = state.expenses.map((expense) => (
      (expense.id !== action.payload.id) ? expense : action.payload));
    return {
      ...state,
      expenses,
      editor: false,
      idToEdit: -1,
    };
  }

  default:
    return state;
  }
}

export default wallet;
