import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

//  username: rahul
//  password: rahul@2021
class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrMsg: false,
    errMsg: '',
    showPassword: false,
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Added header for API compliance
      },
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 7})

        const {history} = this.props
        history.replace('/') // Changed push to replace for test case compliance
      } else {
        this.setState({showErrMsg: true, errMsg: data.error_msg})
      }
    } catch (err) {
      this.setState({showErrMsg: true, errMsg: 'Network Error'})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  toggleShowPassword = event => {
    this.setState({showPassword: event.target.checked})
  }

  render() {
    const {showErrMsg, username, password, errMsg, showPassword} = this.state
    return (
      <div className="login-form-bg">
        <div className="login-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            className="login-form-logo"
            alt="website logo"
          />

          <form onSubmit={this.onSubmitLoginForm} className="login-form-fields">
            <div className="login-form-field">
              <input
                value={username}
                type="text"
                id="username"
                className="login-form-input"
                placeholder="Username"
                onChange={this.onChangeUsername}
              />
              <label htmlFor="username" className="login-form-label">
                Username
              </label>
            </div>
            <div className="login-form-field">
              <input
                value={password}
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="login-form-input"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
              <label htmlFor="password" className="login-form-label">
                Password
              </label>
            </div>
            <div className="show-password">
              <input
                id="showPassword"
                type="checkbox"
                onChange={this.toggleShowPassword} // changed from onClick to onChange for checkbox compliance
              />
              <label htmlFor="showPassword" className="show-password-text">
                Show Password
              </label>
            </div>
            <button type="submit" className="login-form-button">
              Login
            </button>
            {showErrMsg && <p className="err-msg">*{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
