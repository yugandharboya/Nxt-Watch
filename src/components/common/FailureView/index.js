import './index.css'
// import {FailureViewContainer} from '../../CommonStyles/styledComponents'
import SavedVideosContext from '../../../context/savedVideosContext.js'

const FailureView = props => {
  const {getVideos} = props
  const onCallApi = () => {
    getVideos()
  }
  return (
    <SavedVideosContext.Consumer>
      {({darkTheme}) => (
        <div className="failure-view">
          {darkTheme ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
              className="failure-view-image"
              alt="failure view"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              className="failure-view-image"
              alt="failure view"
            />
          )}
          <h1 className="failure-heading">Oops! Something Went Wrong</h1>
          <p className="failure-view-text">
            We are having some trouble to complete your request.
          </p>
          <p className="failure-view-text">Please try again</p>
          <button type="button" className="retry-button" onClick={onCallApi}>
            Retry
          </button>
        </div>
      )}
    </SavedVideosContext.Consumer>
  )
}
export default FailureView
