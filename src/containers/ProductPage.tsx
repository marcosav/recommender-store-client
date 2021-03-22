import React from 'react'

import { RouteComponentProps } from 'react-router'

import { useProductService } from '../services'

import { Product } from '../types'
import { HttpStatusCode } from '../utils'

interface ProductPageParams {
    id: string
}

const ProductPage: React.FC<RouteComponentProps<ProductPageParams>> = ({
    match,
    history,
}) => {
    const { id } = match.params

    const productService = useProductService()

    const [product, setProduct] = React.useState<Product>()

    React.useEffect(() => {
        const handleNotFound = () => history.push('/404')

        const fetchProduct = async (productId: number) => {
            const r = await productService.getProduct(productId)

            switch (r.status) {
                case HttpStatusCode.OK:
                    setProduct(r.data)
                    break
                case HttpStatusCode.NotFound:
                    handleNotFound()
            }
        }

        let productId = parseInt(id)

        if (isNaN(productId)) handleNotFound()
        else fetchProduct(productId)
    }, [history, productService, id])

    return <p>{JSON.stringify(product)}</p>
}

export default ProductPage
