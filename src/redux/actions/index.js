// Coloque aqui suas actions

const addUser = (value) => ({ type: 'ADD_USER', value });

const addExpense = (value) => ({ type: 'ADD_EXPENSE', value });

function getCurrency(payload) {
  return { type: 'GET_CURRENCY', payload };
}

function failedRequest(error) {
  return { type: 'FAILED_REQUEST', payload: error };
}

function fetchCurrecy() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      delete data.USDT;
      return dispatch(getCurrency({ data }));
    } catch {
      return dispatch(failedRequest('Erro'));
    }
  };
}

export { addUser, addExpense, fetchCurrecy };
