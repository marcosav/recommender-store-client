import React from 'react'

import { FavoriteAPI, FavoriteService } from '../api'

export const FavoriteContext = React.createContext<FavoriteService>(
    new FavoriteAPI()
)

const useFavoriteService = () => React.useContext(FavoriteContext)

export default useFavoriteService
