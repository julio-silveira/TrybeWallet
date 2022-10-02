// Coloque aqui suas actions

const addUser = (value) => ({ type: 'ADD_USER', value });

const addExpense = (payload) => ({ type: 'ADD_EXPENSE', payload });

function getCurrency(payload) {
  return { type: 'GET_CURRENCY', payload };
}

function failedRequest(error) {
  return { type: 'FAILED_REQUEST', payload: error };
}

function fetchCurrecy(expenseData) {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      delete data.USDT;
      if (expenseData === undefined) {
        return dispatch(getCurrency({ data }));
      }
      return dispatch(addExpense({ ...expenseData, exchangeRates: data }));
    } catch {
      return dispatch(failedRequest('Erro'));
    }
  };
}

export { addUser, addExpense, fetchCurrecy };
