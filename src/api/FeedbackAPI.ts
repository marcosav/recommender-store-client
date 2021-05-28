import BaseAPI, { FEEDBACK_API_URL } from './BaseAPI'

import { HttpStatusCode } from '../utils'
import { ActionType } from '../types'

export interface FeedbackService {
    collect: (action: UserAction) => void
}

interface UserAction {
    item: number
    action: ActionType
}

export default class FeedbackAPI extends BaseAPI implements FeedbackService {
    constructor() {
        super(FEEDBACK_API_URL)
    }

    collect = async (action: UserAction) => {
        try {
            await this.post(`/record`, action, [
                HttpStatusCode.ServerError,
                HttpStatusCode.Unauthorized,
            ])
        } catch (ex) {}
    }
}
