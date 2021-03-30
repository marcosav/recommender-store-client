import React from 'react'

import { ProductReportAPI, ProductReportService } from '../api'

export const ProductReportContext = React.createContext<ProductReportService>(
    new ProductReportAPI()
)

const useProductReportService = () => React.useContext(ProductReportContext)

export default useProductReportService
