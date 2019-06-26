import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginRoute.css'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className="login-form">
        <h1 className="login">Login</h1>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
        <Link to='/register'>Need to sign up?</Link>
      </section>
    );
  }
}

export default LoginRoute
