import React from 'react'

import { ProductHolder } from '..'
import { FavoriteService, ProductService } from '../../api'

import { PreviewProduct } from '../../types'
import { useStyles } from './ProductSlider.style'

interface ProductSliderProps {
    products: PreviewProduct[]
    favService: FavoriteService
    productService: ProductService
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products, ...rest }) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            {products.map((p, i) => (
                <ProductHolder key={i} product={p} {...rest} />
            ))}
            <div className={classes.endGap} />
        </div>
    )
}

export default ProductSlider