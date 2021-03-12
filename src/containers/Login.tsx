import React from 'react'

import { useSessionService, useUserService } from '../services'

const Login = () => {
    const userService = useUserService()
    const sessionService = useSessionService()

    const [username, setUsername] = React.useState('a@a.a')
    const [password, setPassword] = React.useState('1')

    React.useEffect(() => {
        const doLogin = async () => {
            if (sessionService.isLogged()) return

            const r = await userService.login({ username, password })

            //if (r.status === 200) ...
        }

        doLogin()
    }, [userService, sessionService, username, password])

    return <></>
}

export default Login
