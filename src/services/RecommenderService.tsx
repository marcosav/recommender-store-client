import React from 'react'

import { RecommenderAPI, RecommenderService } from '../api'

export const RecommenderContext = React.createContext<RecommenderService>(
    new RecommenderAPI()
)

const useRecommenderService = () => React.useContext(RecommenderContext)

export default useRecommenderService
