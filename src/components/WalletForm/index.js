import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrecy } from '../../redux/actions';

class WalletForm extends Component {
  state = {
    inputValue: '',
    description: '',
    currency: 'Moeda',
    method: 'Método',
    tag: 'Categoria',
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

  render() {
    const {
      inputValue,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { currencyOptions } = this.props;

    return (
      <section>
        <form>
          <label htmlFor="inputValue">
            <input
              data-testid="value-input"
              id="inputValue"
              onChange={ this.onInputChange }
              value={ inputValue }
            />
          </label>
          <label htmlFor="description">
            <input
              data-testid="description-input"
              id="description"
              onChange={ this.onInputChange }
              value={ description }
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
        </form>
      </section>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.func.isRequired,
  currencyOptions: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({ currencyOptions: state.wallet.currencies });

const mapDispatchToProps = (dispatch) => ({
  currencies: () => dispatch(fetchCurrecy()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
