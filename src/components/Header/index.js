import './index.css'
import {FaMoon} from 'react-icons/fa'
import {MdOutlineWbSunny} from 'react-icons/md'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import SavedVideosContext from '../../context/savedVideosContext'
import {HeaderContainer} from '../CommonStyles/styledComponents.js'

const Header = props => {
  const handleLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <SavedVideosContext.Consumer>
      {value => {
        const {onToggleTheme, darkTheme} = value
        return (
          <HeaderContainer darkTheme={darkTheme}>
            <Link to="/">
              {darkTheme ? (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  alt="website logo"
                  className="header-logo"
                />
              ) : (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                  className="header-logo"
                />
              )}
            </Link>

            <nav className="header-nav">
              <button
                type="button"
                data-testid="theme"
                className="theme-button"
                onClick={onToggleTheme}
              >
                {darkTheme ? (
                  <MdOutlineWbSunny className="dark-theme-icon" />
                ) : (
                  <FaMoon className="theme-icon" />
                )}
              </button>

              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                className="header-profile"
                alt="profile"
              />

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </nav>
          </HeaderContainer>
        )
      }}
    </SavedVideosContext.Consumer>
  )
}

export default withRouter(Header)
