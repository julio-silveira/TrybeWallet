import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrecy, finishEdit } from '../../redux/actions';

const Alimentação = 'Alimentação';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: Alimentação,
    renderLock: false,
  };

  componentDidMount() {
    const { currencies } = this.props;
    currencies();
  }

  componentDidUpdate() {
    const { editor } = this.props;
    const { renderLock } = this.state;
    this.editSetup(editor, renderLock);
  }

  onInputChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const { createExpense, editor } = this.props;
    if (editor) this.editExpense();
    else this.saveExpense(createExpense);
  };

  findExpense = () => {
    const { idToEdit, expenses } = this.props;
    const getExpenses = expenses.filter((expense) => expense.id === idToEdit);
    return getExpenses[0];
  };

  saveExpense(createExpense) {
    const { id, value, description, currency, method, tag } = this.state;
    const data = { id, value, description, currency, method, tag };
    createExpense(data);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentação }));
  }

  editExpense() {
    const { id, exchangeRates } = this.findExpense();
    const { value, description, currency, method, tag } = this.state;
    const { finish } = this.props;
    finish({ id, value, description, currency, method, tag, exchangeRates });
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentação,
      renderLock: false,
    });
  }

  editSetup(editor, renderLock) {
    if (editor && !renderLock) {
      const {
        value,
        description,
        currency,
        method,
        tag } = this.findExpense();
      this.setState({
        value,
        description,
        currency,
        method,
        tag,
        renderLock: true,
      });
    }
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { currencyOptions, editor } = this.props;
    return (
      <section>
        <form onSubmit={ this.submitHandler }>
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

          {editor ? (
            <button
              data-testid="edit-btn"
              type="submit"
            >
              Editar despesa
            </button>
          ) : (
            <button
              data-testid="submit-btn"
              type="submit"
            >
              Adicionar despesa
            </button>)}
        </form>
      </section>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.func.isRequired,
  createExpense: PropTypes.func.isRequired,
  currencyOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  finish: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
  currencyOptions: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchCurrecy()),
  createExpense: (data) => dispatch(fetchCurrecy(data)),
  finish: (data) => dispatch(finishEdit(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
