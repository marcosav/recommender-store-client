import React from 'react'

import { PreviewProduct } from '../types'

import { useFavoriteService } from '../services'

import { ProductHolder } from '../components'

const Favorites = () => {
    const favService = useFavoriteService()

    const [items, setItems] = React.useState<PreviewProduct[]>([])

    const productOrUser = true

    React.useEffect(() => {
        const fetchFavs = async () => {
            const r = await favService.getForUser(productOrUser)
            setItems(r.data.items as any)
        }

        fetchFavs()
    }, [favService, productOrUser])

    return (
        <>
            {items.map((p, i: number) => (
                <ProductHolder key={i} product={p} favService={favService} />
            ))}
        </>
    )
}

export default Favorites
