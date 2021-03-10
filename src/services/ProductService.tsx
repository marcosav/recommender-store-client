import React from 'react'

import { ProductAPI, ProductService } from '../api'

export const ProductContext = React.createContext<ProductService>(
    new ProductAPI()
)

const useProductService = () => React.useContext(ProductContext)

export default useProductService
