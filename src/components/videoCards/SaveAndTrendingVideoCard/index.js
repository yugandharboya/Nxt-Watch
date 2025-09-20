import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

const SaveAndTrendingVideoCard = props => {
  const {video} = props
  const {
    id,
    title,
    thumbnailUrl,
    channelName,
    channelProfileImageUrl,
    viewCount,
    publishedAt,
  } = video
  const date = new Date(publishedAt)
  const formattedDate = formatDistanceToNow(date, {addSuffix: true})
  return (
    <li className="save-trending-video-card">
      <Link to={`/videos/${id}`}>
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="trending-video-thumbnail"
        />

        <div className="video-bottom">
          <p>{title}</p>
          <div className="trending-channel-info">
            <img
              src={channelProfileImageUrl}
              className="channel-logo"
              alt="channel logo"
            />
            <p>{channelName}</p>
          </div>
          <div className="trending-video-meta">
            <p>{`${viewCount} views`}</p>
            <span>.</span>
            <p>{formattedDate}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SaveAndTrendingVideoCard
