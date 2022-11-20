/* eslint-disable max-lines */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { fetchCurrecy, finishEdit } from '../../redux/actions';

import { CustomFormContainer, CustomFormBox } from './styles';

const metodos = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
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

  onInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const { createExpense, editor } = this.props;
    if (editor) this.editExpense();
    else this.saveExpense(createExpense);
  };

  disableAddButton = () => {
    const {
      value,
      description,
      currency,
      method,
      tag } = this.state;

    return (
      value === ''
        || description === ''
        || currency === ''
        || method === ''
        || tag === ''
    );
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
    }));
  }

  editExpense() {
    const { id, exchangeRates } = this.findExpense();
    const { value, description, currency, method, tag } = this.state;
    const { finish } = this.props;
    finish({ id, value, description, currency, method, tag, exchangeRates });
    this.setState({
      value: '',
      description: '',
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
      <CustomFormContainer elevation={ 5 }>
        <form onSubmit={ this.submitHandler }>
          <CustomFormBox spacing={ 2 } direction={ { xs: 'column', md: 'row' } }>
            <TextField
              type="text"
              data-testid="description-input"
              id="description"
              name="description"
              onChange={ this.onInputChange }
              value={ description }
              placeholder="Descrição"
              size="small"
            />
            <TextField
              data-testid="currency-input"
              id="currency"
              name="currency"
              label="Moeda"
              select
              onChange={ this.onInputChange }
              value={ currency }
              helperText="Escolha a moeda"
              size="small"
            >
              {currencyOptions.map((curr) => (
                <MenuItem
                  key={ curr }
                  value={ curr }
                >
                  { curr }
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="number"
              data-testid="value-input"
              id="value"
              name="value"
              onChange={ this.onInputChange }
              value={ value }
              placeholder="Preço"
              size="small"
            />

            <TextField
              data-testid="tag-input"
              id="tag"
              name="tag"
              label="Tipo"
              select
              onChange={ this.onInputChange }
              value={ tag }
              helperText="Escolha o tipo da despesa"
              size="small"
            >
              {tags.map((uniquetag) => (
                <MenuItem key={ uniquetag } value={ uniquetag }>{ uniquetag }</MenuItem>
              ))}
            </TextField>

            <TextField
              data-testid="method-input"
              id="method"
              name="method"
              select
              label="Metodo"
              onChange={ this.onInputChange }
              value={ method }
              helperText="Escolha o método de pagamento"
              size="small"
            >
              {metodos.map((metodo) => (
                <MenuItem key={ metodo } value={ metodo }>{ metodo }</MenuItem>
              ))}
            </TextField>
          </CustomFormBox>

          <CustomFormBox>
            {editor ? (
              <Button
                variant="contained"
                data-testid="edit-btn"
                type="submit"
                color="secondary"
                size="small"
                sx={ { color: 'white' } }
                disabled={ this.disableAddButton() }
              >
                Editar despesa
              </Button>
            ) : (
              <Button
                variant="contained"
                data-testid="submit-btn"
                type="submit"
                color="secondary"
                size="small"
                sx={ { color: 'white' } }
                disabled={ this.disableAddButton() }
              >
                Adicionar despesa

              </Button>)}
          </CustomFormBox>
        </form>
      </CustomFormContainer>
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
