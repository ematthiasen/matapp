import { Alert  } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const Notifications = () => {
  const notification = useSelector(state => state.notification)
  if(notification)
    return (
      <Alert
        severity='warning'>{notification.messageText}</Alert>
    )
  else return null
}

export default Notifications