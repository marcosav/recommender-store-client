import React from 'react'

import { Redirect } from 'react-router'
import { useSession } from '../services'

const Logout = () => {
    const session = useSession()
    session.logout()
    return <Redirect to="/" />
}

export default Logout
