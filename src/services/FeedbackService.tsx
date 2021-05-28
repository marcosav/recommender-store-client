import React from 'react'

import { FeedbackAPI, FeedbackService } from '../api'

export const FeedbackContext = React.createContext<FeedbackService>(
    new FeedbackAPI()
)

const useFeedbackService = () => React.useContext(FeedbackContext)

export default useFeedbackService
