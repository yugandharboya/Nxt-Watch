import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideos: [],
  addVideo: () => {},
  removeVideo: () => {},
  darkTheme: false, // default theme
  onToggleTheme: () => {}, // function to toggle theme
})
export default SavedVideosContext
