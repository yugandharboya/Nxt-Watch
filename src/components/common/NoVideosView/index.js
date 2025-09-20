import './index.css'

const NoVideosView = props => {
  const {getVideos} = props

  const onCallApi = () => {
    getVideos()
  }

  return (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        className="failue-view-image"
        alt="no videos"
      />
      <h1 className="failure-heading">No Search results found</h1>
      <p className="failure-view-text">
        Try different key words or remove search filter
      </p>
      <p className="failure-view-text">Please try again</p>
      <button type="button" className="Retry-button" onClick={onCallApi}>
        Retry
      </button>
    </div>
  )
}

export default NoVideosView
