import React from 'react'
import { Route } from 'react-router-dom'
import Dashboaard from '../Containers/dashboard'
import History from '../Containers/history'

function index() {
  return (
    <>
      <Route path="/dashboard" element={<Dashboaard />} />
      <Route path="/history" element={<History />} />
    </>
  )
}

export default index