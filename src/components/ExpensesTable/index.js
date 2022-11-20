import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Button } from '@mui/material';
import { deleteExpense, startEdit } from '../../redux/actions';
import { CustomTableCell, CustomTableCellHeader } from './styles';

const TABLE_LABELS = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir',
];

class ExpensesTable extends Component {
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

  handleExpenseChange = ({ currentTarget: { value, name } }) => {
    const { del, edit } = this.props;
    if (name === 'delete') {
      del(parseInt(value, 10));
    } else if (name === 'edit') {
      edit(parseInt(value, 10));
    }
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
    return (
      <TableContainer
        component={ Paper }
        sx={ { background: '#003BE5', width: '90%', margin: '10px 0' } }
        onClick={ (e) => e.stopPropagation() }
      >
        <Table
          sx={ { minWidth: 650 } }
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {TABLE_LABELS.map((label) => (
                <CustomTableCellHeader key={ label }>{label}</CustomTableCellHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
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
                <TableRow
                  key={ id }
                  sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
                >
                  <CustomTableCell>{ description }</CustomTableCell>
                  <CustomTableCell>{ tag }</CustomTableCell>
                  <CustomTableCell>{ method }</CustomTableCell>
                  <CustomTableCell>{ value }</CustomTableCell>
                  <CustomTableCell>{ fiat }</CustomTableCell>
                  <CustomTableCell>{ exchangeRate }</CustomTableCell>
                  <CustomTableCell>{ exchangedValue }</CustomTableCell>
                  <CustomTableCell>{ exchangeFiat }</CustomTableCell>
                  <CustomTableCell>
                    <Button
                      value={ id }
                      type="button"
                      name="edit"
                      data-testid="edit-btn"
                      onClick={ this.handleExpenseChange }
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      value={ id }
                      name="delete"
                      type="button"
                      data-testid="delete-btn"
                      onClick={ this.handleExpenseChange }
                    >
                      <DeleteIcon />
                    </Button>
                  </CustomTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

ExpensesTable.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
