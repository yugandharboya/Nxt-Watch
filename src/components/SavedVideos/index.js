import './index.css'

import {FaFire} from 'react-icons/fa'
import {Component} from 'react'
import Header from '../Header'
import Sidebar from '../Sidebar'
import SaveAndTrendingVideoCard from '../videoCards/SaveAndTrendingVideoCard'
import {SavedVideosContainer} from '../CommonStyles/styledComponents'
import SavedVideosContext from '../../context/savedVideosContext.js'

class SavedVideos extends Component {
  renderNoSavedVideos = () => (
    <div className="no-saved-videos" data-testid="savedVideos">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="no-videos-image"
      />
      <h1>No saved videos found</h1>
      <p className="no-saved-videos-text">
        You can save your videos while watching them
      </p>
    </div>
  )

  renderSavedVideos = savedVideos => (
    <main className="save-videos-main-content">
      <div className="main-content-header" data-testid="banner">
        <div className="saved-header-icon-wrapper">
          <FaFire className="saved-header-icon" />
        </div>
        <h1>Saved Videos</h1>
      </div>
      <ul className="videos-list">
        {savedVideos.map(each => (
          <SaveAndTrendingVideoCard key={each.id} video={each} />
        ))}
      </ul>
    </main>
  )

  render() {
    return (
      <SavedVideosContext.Consumer>
        {({savedVideos, darkTheme}) => (
          <SavedVideosContainer darkTheme={darkTheme}>
            <Header />
            <div className="saved-videos-layout">
              <Sidebar />

              {savedVideos.length === 0
                ? this.renderNoSavedVideos()
                : this.renderSavedVideos(savedVideos)}
            </div>
          </SavedVideosContainer>
        )}
      </SavedVideosContext.Consumer>
    )
  }
}

export default SavedVideos
