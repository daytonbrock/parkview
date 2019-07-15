import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className="App">
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <div className="log-in-form">
          <form onSubmit={this.login}>
            <h1>Login</h1>
            <div>
              <label htmlFor="username">
                <TextField
                  variant="outlined"
                  label="username"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                <TextField
                  variant="outlined"
                  label="password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </label>
            </div>
            <div>
              <Button
                variant="outlined"
                className="log-in"
                type="submit"
                name="submit"
                value="Log In"
              >Login</Button>
            </div>
          </form>
        </div>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
