import React from 'react'
import { RouteComponentProps } from 'react-router'

import { useSessionService } from '../services'

const Logout: React.FC<RouteComponentProps> = ({ history }) => {
    const sessionService = useSessionService()

    React.useEffect(() => {
        const logout = async () => {
            await sessionService.logout()

            history.push('/')
        }

        logout()
    }, [sessionService, history])

    return <></>
}

export default Logout
