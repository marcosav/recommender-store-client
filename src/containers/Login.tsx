import React from 'react'

import { useSession, useUserService } from '../services'

const Login = () => {
    const userService = useUserService()
    const session = useSession()

    const [username, setUsername] = React.useState('a@a.a')
    const [password, setPassword] = React.useState('1')

    React.useEffect(() => {
        const doLogin = async () => {
            if (session.isLogged()) return
            
            const r = await userService.login({ username, password })

            if (r.status === 200) session.update(r.data.token, r.data.user)
        }

        doLogin()
    }, [userService, session, username, password])

    return <></>
}

export default Login
