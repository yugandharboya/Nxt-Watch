import './index.css'

import {FaFire} from 'react-icons/fa'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Header from '../Header'
import Sidebar from '../Sidebar'
import SaveAndTrendingVideoCard from '../videoCards/SaveAndTrendingVideoCard'
import LoadingView from '../common/LoadingView'
import FailureView from '../common/FailureView'
import {TrendingVideosContainer} from '../CommonStyles/styledComponents'
import SavedVideosContext from '../../context/savedVideosContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingVideos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    trendingVideos: [],
  }

  componentDidMount() {
    this.getVideos()
  }

  formatteData = trendingVideos =>
    trendingVideos.map(each => ({
      id: each.id,
      title: each.title,
      thumbnailUrl: each.thumbnail_url,
      channelName: each.channel.name,
      channelProfileImageUrl: each.channel.profile_image_url,
      viewCount: each.view_count,
      publishedAt: each.published_at,
    }))

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const formattedData = this.formatteData(data.videos)
      this.setState({
        trendingVideos: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {trendingVideos} = this.state
    return (
      <ul className="trending-videos-list">
        {trendingVideos.map(each => (
          <SaveAndTrendingVideoCard key={each.id} video={each} />
        ))}
      </ul>
    )
  }

  renderTrendingVideosStatus = () => {
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
    // const jwtToken = Cookies.get('jwt_token')
    // if (!jwtToken) {
    //   return <Redirect to="/login" />
    // }

    return (
      <SavedVideosContext.Consumer>
        {({darkTheme}) => (
          <TrendingVideosContainer darkTheme={darkTheme} data-testid="trending">
            <Header />
            <div className="trending-layout">
              <Sidebar />
              <main className="trending-videos-main-content">
                <div className="main-content-header" data-testid="banner">
                  <div className="trending-header-icon-wrapper">
                    <FaFire className="trending-header-icon" />
                  </div>
                  <h1>Trending</h1>
                </div>
                <section className="main-content-description">
                  {this.renderTrendingVideosStatus()}
                </section>
              </main>
            </div>
          </TrendingVideosContainer>
        )}
      </SavedVideosContext.Consumer>
    )
  }
}

export default TrendingVideos
