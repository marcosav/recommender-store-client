import React from 'react'

import { UserAPI, UserService } from '../api'

export const UserContext = React.createContext<UserService>(new UserAPI())

const useUserService = () => React.useContext(UserContext)

export default useUserService
