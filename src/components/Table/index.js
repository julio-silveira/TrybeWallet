import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteExpense, startEdit } from '../../redux/actions';

class Table extends Component {
  updateExpenses = () => {
    const { expenses } = this.props;
    const data = expenses.map(({
      currency, description, exchangeRates, method, tag, value, id }) => {
      const price = Object.values(exchangeRates)
        .filter(({ code }) => code === currency);

      const numValue = this.numberHandler(value);
      const exchangeRate = this.numberHandler(price[0].ask);
      const changeValue = parseFloat(value) * parseFloat(price[0].ask);
      const exchangedValue = this.numberHandler(changeValue);

      return ({
        description,
        tag,
        method,
        value: (numValue),
        fiat: price[0].name,
        exchangeRate,
        exchangedValue,
        exchangeFiat: 'Real',
        id,
      });
    });
    return data;
  };

  numberHandler(number) {
    const tNumber = parseFloat(number);
    const currencyFormat = new Intl.NumberFormat('en-EN', {
      style: 'currency',
      currency: 'USD',
    })
      .format(tNumber)
      .replace('$', '');
    return currencyFormat;
  }

  render() {
    const data = this.updateExpenses();
    const { del, edit } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {data
            .map((
              { description,
                tag,
                method,
                value,
                fiat,
                exchangeRate,
                exchangedValue,
                exchangeFiat,
                id },
            ) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ value }</td>
                <td>{ fiat }</td>
                <td>{ exchangeRate }</td>
                <td>{ exchangedValue }</td>
                <td>{ exchangeFiat }</td>
                <td>
                  <button
                    id={ id }
                    type="button"
                    data-testid="edit-btn"
                    onClick={
                      ({ target }) => edit(parseInt(target.id, 10))
                    }
                  >
                    Editar
                  </button>
                  <button
                    id={ id }
                    type="button"
                    data-testid="delete-btn"
                    onClick={
                      ({ target }) => del(parseInt(target.id, 10))
                    }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  del: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  del: (id) => dispatch(deleteExpense(id)),
  edit: (id) => dispatch(startEdit(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
