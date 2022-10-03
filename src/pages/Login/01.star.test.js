import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../../tests/helpers/renderWith';
import App from '../../App';

describe('Testa a página de Login', () => {
  it('Testa se os Inputs estão na tela e o botão estão na tela', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
    expect(btnSubmit).toBeDisabled();

    userEvent.type(emailInput, 'abc@cde.com');
    expect(btnSubmit).toBeDisabled();
    userEvent.type(passwordInput, '123456');
    expect(btnSubmit).not.toBeDisabled();

    userEvent.click(btnSubmit);
  });
});
