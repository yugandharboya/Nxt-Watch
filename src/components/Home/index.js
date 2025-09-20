import './index.css'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoSearch, IoCloseSharp} from 'react-icons/io5'
import Header from '../Header'
import HomeVideoCard from '../videoCards/HomeVideoCard'
import LoadingView from '../common/LoadingView'
import FailureView from '../common/FailureView'
import NoVideosView from '../common/NoVideosView'
import Sidebar from '../Sidebar'
import SavedVideosContext from '../../context/savedVideosContext'
import {
  MainContent,
  AppContainer,
  HomeBannerSection,
} from '../CommonStyles/styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    videosList: [],
    showBanner: true,
  }

  componentDidMount() {
    this.getVideos('')
  }

  getVideos = async searchInput => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        const formattedData = this.getFormattedData(data.videos)
        this.setState({
          videosList: formattedData,
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

  getFormattedData = videos =>
    videos.map(each => ({
      id: each.id,
      title: each.title,
      thumbnailUrl: each.thumbnail_url,
      channelName: each.channel.name,
      channelProfileImage: each.channel.profile_image_url,
      viewsCount: each.view_count,
      publishedAt: each.published_at,
    }))

  renderSuccessView = darkTheme => {
    const {videosList} = this.state
    return (
      <MainContent darkTheme={darkTheme}>
        {videosList.map(each => (
          <HomeVideoCard
            key={each.id}
            videoDetails={each}
            darkTheme={darkTheme}
          />
        ))}
      </MainContent>
    )
  }

  renderFailureView = () => (
    <FailureView getVideos={() => this.getVideos(this.state.searchInput)} />
  )

  renderLoadingView = () => (
    <div className="loader-container">
      <LoadingView />
    </div>
  )

  renderNoVideosView = () => (
    <NoVideosView getVideos={() => this.getVideos(this.state.searchInput)} />
  )

  renderVideosStatusView = darkTheme => {
    const {apiStatus, videosList} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return videosList.length === 0
          ? this.renderNoVideosView()
          : this.renderSuccessView(darkTheme)
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    const {searchInput} = this.state
    this.getVideos(searchInput)
  }

  removeBanner = () => {
    this.setState({showBanner: false})
  }

  render() {
    const {searchInput, showBanner} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (!jwtToken) {
      return <Redirect to="/login" />
    }

    return (
      <SavedVideosContext.Consumer>
        {value => {
          const {darkTheme} = value
          return (
            <AppContainer data-testid="home">
              <Header />
              <div className="layout">
                <Sidebar />
                <main className="home-main-content">
                  {showBanner && (
                    <HomeBannerSection
                      className="promo-banner"
                      data-testid="banner"
                    >
                      <div className="banner-description">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                          className="promo-banner-logo"
                        />
                        <p>Buy Nxt Watch premium prepaid plans with UPI</p>
                        <button className="get-now-button">GET IT NOW</button>
                      </div>
                      <button
                        onClick={this.removeBanner}
                        className="close-button"
                        data-testid="close"
                      >
                        <IoCloseSharp />
                      </button>
                    </HomeBannerSection>
                  )}

                  <section className="search-bar">
                    <input
                      type="search"
                      value={searchInput}
                      placeholder="Search"
                      className="search-element"
                      onChange={this.onChangeSearchInput}
                    />
                    <button
                      onClick={this.onClickSearch}
                      className="search-button"
                      data-testid={searchInput}
                    >
                      <IoSearch />
                    </button>
                  </section>

                  {this.renderVideosStatusView(darkTheme)}
                </main>
              </div>
            </AppContainer>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }
}

export default Home
