import React from 'react'

import { Redirect } from 'react-router'
import { useSessionService } from '../services'

const Logout = () => {
    const sessionService = useSessionService()
    sessionService.logout()
    return <Redirect to="/" />
}

export default Logout
