import React from 'react'
import NavigationBar from '../components/common/NavigationBar.js'
import ScreenContent from '../components/common/ScreenContent.js'

function HomeScreen() {
  return (
    <div className="home-screen__container">
      <ScreenContent />
      <NavigationBar />
    </div>
  )
}

export default HomeScreen
