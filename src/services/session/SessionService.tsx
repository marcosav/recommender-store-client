import React from 'react'

import { AuthService, AuthServiceImpl } from './AuthService'
import { SessionStorage, SessionStorageImpl } from './SessionStorage'

export type SessionService = AuthService & SessionStorage

const sessionStorage = SessionStorageImpl()
const authService = AuthServiceImpl(sessionStorage)

export const SessionContext = React.createContext<SessionService>({
    ...authService,
    ...sessionStorage,
})

const useSessionService = () => React.useContext(SessionContext)

export default useSessionService
