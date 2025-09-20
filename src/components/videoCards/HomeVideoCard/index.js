import './index.css'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {VideoTitle} from '../../CommonStyles/styledComponents.js'

const HomeVideoCard = props => {
  const {videoDetails, darkTheme} = props
  const {
    id,
    title,
    thumbnailUrl,
    channelName,
    channelProfileImage,
    viewsCount,
    publishedAt,
  } = videoDetails

  // Format publishedAt safely
  const date = new Date(publishedAt)
  const formattedDate = formatDistanceToNow(date, {addSuffix: true})

  return (
    <li className="video-card">
      <Link to={`/videos/${id}`} className="video-link">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="video-thumbnail"
        />
        <div className="video-card-bottom">
          <img
            src={channelProfileImage}
            alt="channel logo"
            className="channel-logo"
          />

          <div className="video-card-details">
            <VideoTitle darkTheme={darkTheme}>{title}</VideoTitle>
            <p className="channel-name">{channelName}</p>
            <div className="meta-info">
              <p className="views-count">{viewsCount} views</p>
              <span className="dot-separator">•</span>
              <p className="published-at">{formattedDate}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default HomeVideoCard
