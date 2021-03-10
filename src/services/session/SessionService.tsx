import React from 'react'

import { AuthService, AuthServiceImpl } from './AuthService'
import { SessionStorage, SessionStorageImpl } from './SessionStorage'

type SessionContextType = AuthService & SessionStorage

const sessionStorage = new SessionStorageImpl()
const authService = new AuthServiceImpl(sessionStorage)

export const SessionContext = React.createContext<SessionContextType>({
    ...authService,
    ...sessionStorage,
})

const useSession = () => React.useContext(SessionContext)

export default useSession
