import React, { Fragment } from 'react'
import HomePageComponent from '../component/HomePageComponent'
import TopNavigation from '../component/TopNavigation'

const HomePage = () => {
  return (
    <Fragment>
        <TopNavigation/>
        <HomePageComponent/>
    </Fragment>
  )
}

export default HomePage