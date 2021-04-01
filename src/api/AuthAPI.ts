import { HttpStatusCode } from '../utils'

import BaseAPI from './BaseAPI'

export default class AuthAPI extends BaseAPI {
    auth = async () =>
        await this.post<string>('/auth', null, [HttpStatusCode.Unauthorized])
}
