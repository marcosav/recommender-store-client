import React from 'react'

import { useProductService } from '../services'
import { PreviewProduct } from '../types'

import { HttpStatusCode } from '../utils'

const Home = () => {
    const productService = useProductService()

    const [products, setProducts] = React.useState<PreviewProduct[]>([])

    React.useEffect(() => {
        const fetchProducts = async () => {
            const r = await productService.searchProducts({ query: "P1" })

            if (r.status !== HttpStatusCode.OK) return

            setProducts(r.data.items.slice(0, 8))
        }

        fetchProducts()
    }, [productService])

    return <></>
}

export default Home
