import React from 'react'
import NavigationBar from '../components/common/NavigationBar.js'
import ScreenContent from '../components/common/ScreenContent.js'

export default function HomeScreen() {
  return (
    <div className="home-screen__container">
      <ScreenContent />
      <NavigationBar />
    </div>
  )
}
