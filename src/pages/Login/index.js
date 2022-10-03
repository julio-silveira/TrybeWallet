import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUser, fetchCurrecy } from '../../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  onInputChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    const { userData, history } = this.props;
    userData(this.state);
    history.push('/carteira');
  };

  saveButtonHandler() {
    const { email, password } = this.state;
    const minPasswordLength = 5;
    // regex de email retirada deste site:
    // https://stackoverflow.com/questions/742451/what-is-a-good-regular-expression-for-catching-typos-in-an-email-address

    const emailRegex = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/i;
    const validateEmail = emailRegex.test(email);
    return !(validateEmail && password.length > minPasswordLength);
  }

  render() {
    const { email, password } = this.state;

    return (
      <section>
        <form onSubmit={ this.onSubmitForm }>
          <label htmlFor="email">
            <input
              data-testid="email-input"
              id="email"
              value={ email }
              onChange={ this.onInputChange }
              type="email"
              placeholder="Email"
            />
          </label>

          <label htmlFor="password">
            <input
              data-testid="password-input"
              id="password"
              value={ password }
              onChange={ this.onInputChange }
              type="password"
              placeholder="Senha"
            />
            <button
              data-testid="submit-btn"
              type="submit"
              disabled={ this.saveButtonHandler() }
              onClick={ fetchCurrecy }
            >
              Entrar
            </button>
          </label>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  userData: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userData: (state) => dispatch(addUser(state)),
});

export default connect(null, mapDispatchToProps)(Login);
