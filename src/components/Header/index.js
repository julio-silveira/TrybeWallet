import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
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
          data-testid="currency-field"
        >
          BRL
        </p>
        <p
          data-testid="total-field"
        >
          0
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({ email: state.user.email });

export default connect(mapStateToProps, null)(Header);
