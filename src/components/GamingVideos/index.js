import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import Sidebar from '../Sidebar'
import LoadingView from '../common/LoadingView'
import FailureView from '../common/FailureView'
import GamingVideoCard from '../videoCards/GamingVideoCard'
import SavedVideosContext from '../../context/savedVideosContext'
import {GamingVideosContainer} from '../CommonStyles/styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GamingVideos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    gamingVideos: [],
  }

  componentDidMount() {
    this.getVideos()
  }

  formatteData = gamingVideos => {
    const data = gamingVideos.map(each => ({
      id: each.id,
      title: each.title,
      thumbnailUrl: each.thumbnail_url,
      viewCount: each.view_count,
    }))
    return data
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) return <Redirect to="/login" />
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        const formattedData = this.formatteData(data.videos)
        this.setState({
          gamingVideos: formattedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (err) {
      console.log('Network Error', err)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {gamingVideos} = this.state
    return (
      <ul className="gaming-videos-list">
        {gamingVideos.map(each => (
          <GamingVideoCard key={each.id} video={each} />
        ))}
      </ul>
    )
  }

  renderGamingVideosStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return <FailureView getVideos={this.getVideos} />
      case apiStatusConstants.inProgress:
        return <LoadingView />
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) return <Redirect to="/login" />

    return (
      <SavedVideosContext.Consumer>
        {({darkTheme}) => (
          <GamingVideosContainer darkTheme={darkTheme} data-testid="gaming">
            <Header />
            <div className="layout">
              <Sidebar />
              <main className="gaming-videos-main-content">
                <div className="gaming-banner" data-testid="banner">
                  <div className="trending-header-icon-wrapper">
                    <SiYoutubegaming className="trending-header-icon" />
                  </div>
                  <h1>Gaming</h1>
                </div>
                <section className="main-content-description">
                  {this.renderGamingVideosStatus()}
                </section>
              </main>
            </div>
          </GamingVideosContainer>
        )}
      </SavedVideosContext.Consumer>
    )
  }
}

export default GamingVideos
