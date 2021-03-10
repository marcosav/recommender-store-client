import React from 'react'

import { RouteComponentProps } from 'react-router'

import { useProductService } from '../services'

import { Product } from '../types'

interface SearchParams {
    query: string
}

const Search: React.FC<RouteComponentProps<SearchParams>> = ({ match }) => {
    const { query } = match.params

    const productService = useProductService()

    const [products, setProducts] = React.useState<Product[]>()

    React.useEffect(() => {
        const fetchProducts = async () => {
            console.debug("fetching search")
            const r = await productService.searchProducts({ query })
            setProducts(r.data)
            console.log(r)
        }

        fetchProducts()
    }, [productService, query])

    return (
        <>
            <p>{JSON.stringify(products)}</p>
            <p>{query}</p>
        </>
    )
}

export default Search
