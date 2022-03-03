import React, { Fragment } from 'react'
import AddNotesComponent from '../component/AddNotesComponent'
import TopNavigation from '../component/TopNavigation'

const AddNotes = () => {
  return (
    <Fragment>
        <TopNavigation/>
        <AddNotesComponent/>
    </Fragment>
  )
}

export default AddNotes