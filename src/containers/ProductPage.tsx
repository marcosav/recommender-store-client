import React from 'react'

import ContentLoader from 'react-content-loader'

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

    const Loader = () => (
        <ContentLoader viewBox="0 0 500 500" height={500} width={500}>
            <text
                x="150"
                y="225"
                style={{
                    fontSize: 50,
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                }}
            >
                Loading...
            </text>
        </ContentLoader>
    )

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
                    break
                default:
                    //error
            }
        }

        let productId = parseInt(id)

        if (isNaN(productId)) handleNotFound()
        else fetchProduct(productId)
    }, [history, productService, id])

    return product ? <p>{JSON.stringify(product)}</p> : <Loader />
}

export default ProductPage
