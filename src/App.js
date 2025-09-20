import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import VideoItemDetails from './components/VideoItemDetails'
import TrendingVideos from './components/TrendingVideos'
import GamingVideos from './components/GamingVideos'
import SavedVideos from './components/SavedVideos'
import SavedVideosContext from './context/savedVideosContext'
import NotFound from './components/NotFound'

// Replace your code here
class App extends Component {
  state = {savedVideos: [], darkTheme: false}

  addVideo = video => {
    this.setState(prevState => ({
      savedVideos: [...prevState.savedVideos, video],
    }))
  }

  removeVideo = () => null

  onToggleTheme = () => {
    this.setState(prevState => ({darkTheme: !prevState.darkTheme}))
  }

  render() {
    const {savedVideos, darkTheme} = this.state
    console.log('app.js', darkTheme)
    return (
      <SavedVideosContext.Provider
        value={{
          savedVideos,
          darkTheme,
          addVideo: this.addVideo,
          removeVideo: this.removeVideo,
          onToggleTheme: this.onToggleTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/trending" component={TrendingVideos} />
          <ProtectedRoute exact path="/gaming" component={GamingVideos} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </SavedVideosContext.Provider>
    )
  }
}

export default App
