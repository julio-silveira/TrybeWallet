import { Box } from '@mui/material';
import React from 'react';

import Header from '../../components/Header';
import ExpensesTable from '../../components/ExpensesTable';
import WalletForm from '../../components/WalletForm';
import CustomWalletContainer from './styles';

class Wallet extends React.Component {
  render() {
    return (
      <CustomWalletContainer>
        <Header />
        <WalletForm />
        <ExpensesTable />
      </CustomWalletContainer>
    );
  }
}

export default Wallet;
