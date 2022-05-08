import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notifications = () => {
  const notification = useSelector(state => state.notification)

  if(notification)
    return (

      <Alert variant='warning'>{notification.messageText}</Alert>

    )
  else return null
}

export default Notifications