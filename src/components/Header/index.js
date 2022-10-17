import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, Container, Stack, Toolbar, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logoTrybeWallet from '../../images/logoTrybeWallet.svg';

class Header extends Component {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    this.updateTotalExpenses();
  }

  updateTotalExpenses() {
    const { expenses } = this.props;
    const value = this.expenseReducer(expenses);
    return new Intl.NumberFormat('en-EN', {
      style: 'currency',
      currency: 'USD',
    })
      .format(value)
      .replace('$', '');
  }

  expenseReducer(expenses) {
    return (expenses.length === 0) ? 0 : Math.floor(expenses
      .reduce((acc, { value, exchangeRates, currency }) => {
        const price = Object.values(exchangeRates)
          .filter(({ code }) => code === currency);
        return acc + parseFloat(price[0].ask) * value;
      }, 0) * 100) / 100;
  }

  render() {
    const { email } = this.props;
    return (
      <AppBar
        position="static"
        color="inherit"
        sx={ {
          width: '80%',
          height: '10%',
          justifyContent: 'center' } }
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={ {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center' } }
          >
            <img src={ logoTrybeWallet } alt="logo" />

            <Stack spacing={ 1 } direction="row">
              <AccountBalanceWalletIcon
                sx={ { display: { xs: 'none', md: 'flex' } } }
                color="secondary"
              />
              <Typography variant="h5">
                Total de Despesas:
              </Typography>
              <Typography variant="h6" data-testid="header-currency-field">
                BRL
              </Typography>
              <Typography variant="h6" data-testid="total-field">
                {this.updateTotalExpenses()}
              </Typography>
            </Stack>
            <Stack spacing={ 1 } direction="row">
              <AccountCircleIcon
                sx={ { display: { xs: 'none', md: 'flex' } } }
                color="secondary"
              />
              <Typography variant="h6" data-testid="email-field">
                { email }
              </Typography>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
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
