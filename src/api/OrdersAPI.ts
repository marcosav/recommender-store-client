import BaseAPI, { RPromise } from './BaseAPI'

import { Order } from '../types'
import { Paged, PagedParams } from './types'
import { HttpStatusCode } from '../utils'

const ORDERS_PATH = '/orders'

interface OrderListParams {
    userId?: number
}

export interface OrdersService {
    getForUser: (
        params: OrderListParams & PagedParams
    ) => RPromise<Paged<Order>>
}

export default class OrdersAPI extends BaseAPI implements OrdersService {
    getForUser = (params: OrderListParams & PagedParams) =>
        this.get<Paged<Order>>(ORDERS_PATH, params, [HttpStatusCode.NotFound])
}
