import styled from 'styled-components'

export const MainContent = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 15px;
  color: ${props => (props.darkTheme ? '#ffffff' : '')};
`
export const HeaderContainer = styled.header`
 display: flex;
  align-items: center;
  justify-content: space-between;
  min-height:100px;
  width:100%;
  padding: 0px 30px 0px 30px;
  background-color:${props => (props.darkTheme ? '#181818' : '#f9f9f9')}
    color:${props => (props.darkTheme ? '#ffffff' : '')};
`
export const VideoTitle = styled.p`
  margin: 0px;
  color: ${props => (props.darkTheme ? '#ffffff' : '')};
`
export const SideBarContainer = styled.aside`
display: flex;
  flex-direction: column;
  padding-left: 20px;
  justify-content: space-between;
  width: 240px;
  min-width: 240px;
  max-width: 240px;
  height: 100%;
  background-color:${props => (props.darkTheme ? '#181818' : '#f9f9f9')}
    color:${props => (props.darkTheme ? '#ffffff' : '')};
`
export const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: ${props => (props.darkTheme ? '#181818' : '#f9f9f9')};
  color: ${props => (props.darkTheme ? '#ffffff' : '')};
`
export const TrendingVideosContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: ${props => (props.darkTheme ? '#0f0f0f' : '#f9f9f9')};
  color: ${props => (props.darkTheme ? '#ffffff' : '')};
`
export const GamingVideosContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${props => (props.darkTheme ? '#0f0f0f' : '#f9f9f9')};
  color: ${props => (props.darkTheme ? '#ffffff' : '')};
`
export const SavedVideosContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${props => (props.darkTheme ? '#0f0f0f' : '#f9f9f9')};
  color: ${props => (props.darkTheme ? '#ffffff' : '')};
`
export const VideoItemDetailsContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: ${props => (props.darkTheme ? '#0f0f0f' : '#f9f9f9')};
  color: ${props => (props.darkTheme ? '#ffffff' : '')};
`
export const HomeBannerSection = styled.section`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  height: 120px;
  width: 80%;

  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px 0px 10px 10px;
`
export const CustomButton = styled.button`
  border-width: 0px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #ffffff;
  cursor: pointer;
  color: ${props =>
    props.type === 'like'
      ? props.likeActive
        ? '#2563eb'
        : '#64748b'
      : props.type === 'dislike'
      ? props.dislikeActive
        ? '#2563eb'
        : '#64748b'
      : ''};
`
