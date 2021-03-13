import React from 'react'

import { RouteComponentProps } from 'react-router'

import { useCartService, useProductService } from '../services'

import { Product, PreviewProduct } from '../types'

import { Button } from '@material-ui/core'

interface SearchParams {
    query: string
}

const Search: React.FC<RouteComponentProps<SearchParams>> = ({ match }) => {
    const { query } = match.params

    const productService = useProductService()
    const cartService = useCartService()

    const [products, setProducts] = React.useState<PreviewProduct[]>([])
    const [total, setTotal] = React.useState(0)

    React.useEffect(() => {
        const fetchProducts = async () => {
            console.debug('fetching search')
            const r = await productService.searchProducts({ query })
            setProducts(r.data.items)
            setTotal(r.data.total)
            console.log(r.data)
        }

        fetchProducts()
    }, [productService, query])

    return (
        <>
            <p>
                {products.map((p, i: number) => (
                    <Button
                        key={i}
                        onClick={() =>
                            cartService.update({
                                productId: p.id,
                                amount: 1,
                                add: true,
                            })
                        }
                    >
                        {p.name}
                    </Button>
                ))}
            </p>
            <p>{query}</p>
        </>
    )
}

export default Search
