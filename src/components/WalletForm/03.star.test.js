import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../tests/helpers/renderWith';
import WalletForm from '.';

describe('Testa o formulário de wallet', () => {
  it('Testa se os Inputs estão na tela e o botão estão na tela', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const btnSubmit = screen.getByTestId('submit-btn');

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
  });
});
