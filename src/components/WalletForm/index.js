import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrecy } from '../../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  onInputChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  };

  saveButtonHandler = (event) => {
    event.preventDefault();
    const { expenses, createExpense } = this.props;
    const data = { id: expenses.length, ...this.state };
    createExpense(data);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação' });
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { currencyOptions } = this.props;

    return (
      <section>
        <form onSubmit={ this.saveButtonHandler }>
          <label htmlFor="inputValue">
            <input
              type="number"
              data-testid="value-input"
              id="value"
              onChange={ this.onInputChange }
              value={ value }
              placeholder="Preço"
            />
          </label>
          <label htmlFor="description">
            <input
              type="text"
              data-testid="description-input"
              id="description"
              onChange={ this.onInputChange }
              value={ description }
              placeholder="Descrição"
            />
          </label>
          <label htmlFor="currency">
            <select
              data-testid="currency-input"
              id="currency"
              onChange={ this.onInputChange }
              value={ currency }
            >
              {currencyOptions.map((curr) => (
                <option
                  key={ curr }
                >
                  { curr }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            <select
              data-testid="method-input"
              id="method"
              onChange={ this.onInputChange }
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              data-testid="tag-input"
              id="tag"
              onChange={ this.onInputChange }
              value={ tag }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <button
            data-testid="submit-btn"
            type="submit"
          >
            Adicionar Despesa
          </button>
        </form>
      </section>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.func.isRequired,
  createExpense: PropTypes.func.isRequired,
  currencyOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  currencyOptions: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchCurrecy()),
  createExpense: (data) => dispatch(fetchCurrecy(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
