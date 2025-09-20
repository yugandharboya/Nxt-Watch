import {IoMdHome} from 'react-icons/io'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {SideBarContainer} from '../CommonStyles/styledComponents.js'
import SavedVideosContext from '../../context/savedVideosContext'
import './index.css'

const Sidebar = () => (
  <SavedVideosContext.Consumer>
    {value => {
      const {darkTheme} = value
      return (
        <SideBarContainer darkTheme={darkTheme}>
          <nav aria-label="sidebar navigation">
            <ul className="sidebar-nav">
              <li className="nav-link">
                <Link to="/" className="nav-link-item">
                  <IoMdHome />
                  <p className="nav-links-text">Home</p>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/trending" className="nav-link-item">
                  <FaFire />
                  <p className="nav-links-text">Trending</p>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/gaming" className="nav-link-item">
                  <SiYoutubegaming />
                  <p className="nav-links-text">Gaming</p>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/saved-videos" className="nav-link-item">
                  <MdPlaylistAdd />
                  <p className="nav-links-text">Saved videos</p>
                </Link>
              </li>
            </ul>
          </nav>

          <footer className="sidebar-footer">
            <p className="footer-heading">CONTACT US</p>
            <div className="sidebar-footer-icons">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="footer-icons"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="footer-icons"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="footer-icons"
              />
            </div>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </footer>
        </SideBarContainer>
      )
    }}
  </SavedVideosContext.Consumer>
)

export default Sidebar
