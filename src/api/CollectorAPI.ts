import BaseAPI, { RPromise, COLLECTOR_API_URL } from './BaseAPI'

import { HttpStatusCode } from '../utils'
import { ActionType } from '../types'

export interface CollectorService {
    collect: (action: UserAction) => RPromise
}

interface UserAction {
    item: number
    action: ActionType
    value?: number
}

export default class CollectorAPI extends BaseAPI implements CollectorService {
    constructor() {
        super(COLLECTOR_API_URL)
    }

    collect = (action: UserAction) =>
        this.post(`/record`, action, [
            HttpStatusCode.ServerError,
            HttpStatusCode.Unauthorized,
        ])
}
