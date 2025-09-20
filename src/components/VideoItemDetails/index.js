import './index.css'
import {AiOutlineLike} from 'react-icons/ai'
import {BiDislike} from 'react-icons/bi'
import {RiPlayListAddLine} from 'react-icons/ri'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Sidebar from '../Sidebar'
import FailureView from '../common/FailureView'
import LoadingView from '../common/LoadingView'
import SavedVideosContext from '../../context/savedVideosContext'
import {
  VideoItemDetailsContainer,
  CustomButton,
} from '../CommonStyles/styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoDetails: null,
    isLikeActive: false,
    isDislikeActive: false,
    isVideoSaved: false,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const JwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {id} = match.params

    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const videoDetails = data.video_details

      const formattedData = {
        id: videoDetails.id,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        thumbnailUrl: videoDetails.thumbnail_url,
        channelName: videoDetails.channel.name,
        channelProfileImageUrl: videoDetails.channel.profile_image_url,
        subscriberCount: videoDetails.channel.subscriber_count,
        viewCount: videoDetails.view_count,
        publishedAt: videoDetails.published_at,
        description: videoDetails.description,
      }

      this.setState({
        videoDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  toggleLike = () => {
    const {isDislikeActive} = this.state
    if (isDislikeActive) {
      this.setState({isLikeActive: true, isDislikeActive: false})
    } else {
      this.setState(prevState => ({isLikeActive: !prevState.isLikeActive}))
    }
  }

  toggleDislike = () => {
    const {isLikeActive} = this.state
    if (isLikeActive) {
      this.setState({isLikeActive: false, isDislikeActive: true})
    } else {
      this.setState(prevState => ({
        isDislikeActive: !prevState.isDislikeActive,
      }))
    }
  }

  renderSuccessView = addVideo => {
    const {
      videoDetails,
      isLikeActive,
      isDislikeActive,
      isVideoSaved,
    } = this.state
    if (!videoDetails) return null

    const likeActive = isLikeActive ? 'active-button' : ''
    const dislikeActive = isDislikeActive ? 'active-button' : ''
    const saveIsActive = isVideoSaved ? 'active-button' : ''

    const {
      title,
      videoUrl,
      channelName,
      channelProfileImageUrl,
      subscriberCount,
      viewCount,
      publishedAt,
      description,
    } = videoDetails

    const date = new Date(publishedAt)
    const formattedDate = formatDistanceToNow(date, {addSuffix: true})

    return (
      <>
        <section className="video-player-section">
          <ReactPlayer
            url={videoUrl}
            controls
            playing
            width="100%"
            height="360px"
          />
        </section>

        <section className="video-info">
          <p className="video-title">{title}</p>
          <div className="video-meta-actions">
            <div className="video-meta">
              <p className="views-count">{`${viewCount} views`}</p>
              <span className="dot-seperator">.</span>
              <p className="published-at">{formattedDate}</p>
            </div>
            <div className="video-actions">
              <CustomButton
                type="like"
                likeActive={likeActive}
                onClick={this.toggleLike}
              >
                <AiOutlineLike className={`action-icon ${likeActive}`} />
                <span className={`action-text ${likeActive}`}>Like</span>
              </CustomButton>

              <CustomButton
                type="dislike"
                dislikeActive={dislikeActive}
                className="action-button"
                onClick={this.toggleDislike}
              >
                <BiDislike className={`action-icon ${dislikeActive}`} />
                <span className={`action-text ${dislikeActive}`}>Dislike</span>
              </CustomButton>

              <CustomButton
                type="save"
                saveIsActive={saveIsActive}
                className={`action-button ${saveIsActive}`}
                onClick={() => {
                  addVideo(videoDetails)
                  this.setState({isVideoSaved: true})
                }}
              >
                <RiPlayListAddLine className="action-icon" />
                {isVideoSaved ? (
                  <span className="action-text">Saved</span>
                ) : (
                  <span className="action-text">Save</span>
                )}
              </CustomButton>
            </div>
          </div>
        </section>
        <hr className="divider" />
        <section className="channel-info">
          <div className="channel-overview">
            <img src={channelProfileImageUrl} className="channel-profile" />
            <div className="channel-meta">
              <p className="channel-name">{channelName}</p>
              <p className="subscriber-count">{subscriberCount} subscribers</p>
            </div>
          </div>
          <p className="video-description">{description}</p>
        </section>
      </>
    )
  }

  renderVideoDetailsStatus = addVideo => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView(addVideo)
      case apiStatusConstants.failure:
        return <FailureView getVideos={this.getVideos} />
      case apiStatusConstants.inProgress:
        return <LoadingView />
      default:
        return null
    }
  }

  render() {
    return (
      <SavedVideosContext.Consumer>
        {({addVideo, darkTheme}) => (
          <VideoItemDetailsContainer
            darkTheme={darkTheme}
            className="video-item-details"
            data-testid="videoItemDetails"
          >
            <Header />
            <div className="layout">
              <Sidebar />
              <main className="main-content">
                {this.renderVideoDetailsStatus(addVideo)}
              </main>
            </div>
          </VideoItemDetailsContainer>
        )}
      </SavedVideosContext.Consumer>
    )
  }
}

export default VideoItemDetails
