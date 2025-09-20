import './index.css'
import Sidebar from '../Sidebar'
import Header from '../Header'
import SavedVideosContext from '../../context/savedVideosContext.js'

const NotFound = () => (
  <SavedVideosContext.Consumer>
    {({darkTheme}) => (
      <div className="not-found-page">
        <Header />
        <div className="not-found-layout">
          <Sidebar />
          <main className="not-found-main-content">
            {darkTheme ? (
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png" // corrected dark-theme image
                alt="not found"
                className="not-found-image"
              />
            ) : (
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
                alt="not found"
                className="not-found-image"
              />
            )}

            <h1>Page Not Found</h1>
            <p className="not-found-text">
              We are sorry, the page you requested could not be found
            </p>
          </main>
        </div>
      </div>
    )}
  </SavedVideosContext.Consumer>
)

export default NotFound
