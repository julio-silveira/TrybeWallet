import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    this.updateTotalExpenses();
  }

  updateTotalExpenses() {
    const { expenses } = this.props;
    return (expenses.length === 0.00) ? 0 : Math.floor(expenses
      .reduce((acc, { value, exchangeRates, currency }) => {
        const price = Object.values(exchangeRates)
          .filter(({ code }) => code === currency);
        return acc + parseFloat(price[0].ask) * value;
      }, 0) * 100) / 100;
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <p
          data-testid="email-field"
        >
          { email }
        </p>
        <p
          data-testid="header-currency-field"
        >
          BRL
        </p>
        <p
          data-testid="total-field"
        >
          {this.updateTotalExpenses()}
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses });

export default connect(mapStateToProps, null)(Header);
