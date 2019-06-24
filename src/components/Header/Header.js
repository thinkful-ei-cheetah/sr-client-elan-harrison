import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  openNav = () => {
    document.getElementById('nav').style.width = '250px'
  }

  closeNav = () => {
    document.getElementById('nav').style.width = '0'
  }

  renderLogoutLink() {
    return (
      <div>
        <span>
          {this.context.user.name}
        </span>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav id="nav">
        <i className="fas fa-bars fa-2x closebtn" onClick={this.closeNav}></i>
        <Link to='/login' className='nav-link' onClick={this.closeNav}>Login</Link>
        {' '}
        <Link to='/register' className='nav-link' onClick={this.closeNav}> Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header>
        <i className="fas fa-bars fa-2x" onClick={this.openNav}></i>
        {TokenService.hasAuthToken()
        ? this.renderLogoutLink()
        : this.renderLoginLink()}
        <h1>
          <Link to='/'>
            Spaced repetition
          </Link>
        </h1>
      </header>
    );
  }
}

export default Header
