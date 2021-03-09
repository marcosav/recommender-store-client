import React from 'react'

import { RouteComponentProps } from 'react-router'

import { ProductAPI } from '../api'
import { Product } from '../api/types'

interface ProductPageParams {
    id: string
}

const ProductPage: React.FC<RouteComponentProps<ProductPageParams>> = ({
    match,
}) => {
    const { id } = match.params

    const [product, setProduct] = React.useState<Product>()

    React.useEffect(() => {
        const p = new ProductAPI()

        p.getProduct(parseInt(id)).then((r) => setProduct(r.data))
    }, [id])

    return <p>{JSON.stringify(product)}</p>
}

export default ProductPage
