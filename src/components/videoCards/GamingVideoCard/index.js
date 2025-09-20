import './index.css'

import {Link} from 'react-router-dom'

const GamingVideoCard = props => {
  const {video} = props
  const {id, title, thumbnailUrl, viewCount} = video
  return (
    <article className="gaming-video-card">
      <Link to={`/videos/${id}`}>
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="gaming-video-thumbnail"
        />
      </Link>
      <div className="gaming-video-bottom">
        <p className="gaming-video-heading">{title}</p>
        <p className="gaming-video-meta">{`${viewCount} Watching Worldwide`}</p>
      </div>
    </article>
  )
}

export default GamingVideoCard
