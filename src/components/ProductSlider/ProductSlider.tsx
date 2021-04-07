import React from 'react'

import { ContentWarn, ProductHolder } from '..'
import { FavoriteService, ProductService } from '../../api'
import { useResourceService } from '../../services'

import { PreviewProduct } from '../../types'
import { useStyles } from './ProductSlider.style'

import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'

interface ProductSliderProps {
    products: PreviewProduct[]
    favService: FavoriteService
    productService: ProductService
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products, ...rest }) => {
    const classes = useStyles()
    const resources = useResourceService()

    const { t } = useTranslation()

    return (
        <div className={classes.root}>
            {products.length > 0 ? (
                products.map((p, i) => (
                    <ProductHolder
                        key={i}
                        product={p}
                        {...{ resources, ...rest }}
                    />
                ))
            ) : (
                <ContentWarn>
                    <Typography>{t('info.no_articles')}</Typography>
                </ContentWarn>
            )}
            <div className={classes.endGap} />
        </div>
    )
}

export default ProductSlider
