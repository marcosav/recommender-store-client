import BaseAPI, { COLLECTOR_API_URL } from './BaseAPI'

import { HttpStatusCode } from '../utils'
import { ActionType } from '../types'

export interface CollectorService {
    collect: (action: UserAction) => void
}

interface UserAction {
    item: number
    action: ActionType
}

export default class CollectorAPI extends BaseAPI implements CollectorService {
    constructor() {
        super(COLLECTOR_API_URL)
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
