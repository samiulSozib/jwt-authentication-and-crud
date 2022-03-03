import React, { Fragment } from 'react'
import ProfilePageComponent from '../component/ProfilePageComponent'
import TopNavigation from '../component/TopNavigation'

const ProfilePage = () => {
  return (
    <Fragment>
        <TopNavigation/>
        <ProfilePageComponent/>
    </Fragment>
  )
}

export default ProfilePage