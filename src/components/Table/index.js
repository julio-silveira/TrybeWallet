import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  updateExpenses = () => {
    const { expenses } = this.props;
    const data = expenses.map(({
      currency, description, exchangeRates, method, tag, value, id }) => {
      const price = Object.values(exchangeRates)
        .filter(({ code }) => code === currency);

      // const numValue = parseFloat(value).toPrecision(precision);
      // const ask = parseFloat(price[0].ask).toPrecision(precision);

      const numValue = this.numberHandler(value);
      const ask = this.numberHandler(price[0].ask);
      const changeValue = parseFloat(value) * parseFloat(price[0].ask);
      const exchangedValue = this.numberHandler(changeValue);

      return ({
        description,
        tag,
        method,
        value: (numValue),
        fiat: price[0].name,
        exchangeRate: ask,
        exchangedValue,
        exchangeFiat: 'Real',
        id,
      });
    });
    return data;
  };

  numberHandler(number) {
    const tNumber = parseFloat(number);
    console.log(tNumber);
    const currencyFormat = new Intl.NumberFormat('en-EN', {
      style: 'currency',
      currency: 'USD',
    }).format(tNumber).replace('$', '');
    console.log(currencyFormat);
    return currencyFormat;
  }

  render() {
    const data = this.updateExpenses();
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
                  <button type="button" data-testid="edit-btn">Editar</button>
                  <button type="button" data-testid="delete-btn">Excluir</button>
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
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Table);
