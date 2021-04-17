import { HttpStatusCode } from '../utils'

import BaseAPI from './BaseAPI'

export default class AuthAPI extends BaseAPI {
    auth = async () =>
        await this.post<string>('/auth', null, [HttpStatusCode.Unauthorized])

    reauth = async (header: string) =>
        await this.post<string>(
            '/reauth',
            null,
            [HttpStatusCode.Unauthorized],
            { headers: { authorization: header } }
        )
}
