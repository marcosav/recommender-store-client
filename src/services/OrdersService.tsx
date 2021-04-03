import React from 'react'

import { OrdersAPI, OrdersService } from '../api'

export const OrdersContext = React.createContext<OrdersService>(new OrdersAPI())

const useOrdersService = () => React.useContext(OrdersContext)

export default useOrdersService
