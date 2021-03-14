import React from 'react'

import { RouteComponentProps } from 'react-router'

import {
    useCartService,
    useFavoriteService,
    useProductService,
} from '../services'

import { PreviewProduct } from '../types'

import { ProductHolder } from '../components'

interface SearchParams {
    query: string
}

const Search: React.FC<RouteComponentProps<SearchParams>> = ({ match }) => {
    const { query } = match.params

    const productService = useProductService()
    const cartService = useCartService()
    const favService = useFavoriteService()

    const [products, setProducts] = React.useState<PreviewProduct[]>([])
    const [total, setTotal] = React.useState(0)

    React.useEffect(() => {
        const fetchProducts = async () => {
            console.debug('fetching search')
            const r = await productService.searchProducts({ query })
            setProducts(r.data.items)
            setTotal(r.data.total)
            console.log(query, r.data)
        }

        fetchProducts()
    }, [productService, query])

    return (
        <>
            {products.map((p, i: number) => (
                <ProductHolder
                    key={i}
                    {...{ product: p, cartService, favService }}
                />
            ))}
        </>
    )
}

export default Search
