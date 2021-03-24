import React from 'react'

import { ProductSlider } from '../../components'

import { useFavoriteService, useProductService } from '../../services'
import { PreviewProduct, ProductCategory } from '../../types'

import { HttpStatusCode } from '../../utils'

import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'

import { useTranslation } from 'react-i18next'
import { useStyles } from './Home.style'

import { RouteComponentProps } from 'react-router'

const Home: React.FC<RouteComponentProps> = ({ history }) => {
    const productService = useProductService()
    const favService = useFavoriteService()

    const { t } = useTranslation()

    const classes = useStyles()

    const [categories, setCategories] = React.useState<ProductCategory[]>()

    const [popular, setPopular] = React.useState<PreviewProduct[]>([])
    const [recommended, setRecommended] = React.useState<PreviewProduct[]>([])

    React.useEffect(() => {
        const fetchProducts = async () => {
            const r = await productService.searchProducts({ query: 'P1' })

            if (r.status !== HttpStatusCode.OK) return

            setPopular(r.data.items.slice(0, 8))
            setRecommended(r.data.items.slice(0, 8))
        }

        fetchProducts()
    }, [productService])

    React.useEffect(() => {
        const fetchCategories = async () => {
            const r = await productService.findCategories()

            if (r.status === HttpStatusCode.OK) setCategories(r.data)
        }

        if (!categories) fetchCategories()
    }, [productService, categories])

    const handleCategory = (id: number) =>
        history.push('/search/all', { all: true, category: id })

    return (
        <>
            <Typography
                className={classes.title}
                variant="h3"
                component="h1"
                color="textSecondary"
            >
                {t('home.title')}
            </Typography>
            <div className={classes.categories}>
                {categories &&
                    categories.map((c) => (
                        <Chip
                            key={c.id}
                            color="secondary"
                            onClick={() => handleCategory(c.id)}
                            label={t(`category.${c.name}`)}
                        />
                    ))}
            </div>
            <Divider className={classes.divider} />

            <Typography
                className={classes.subtitle}
                variant="h5"
                component="h2"
                color="textSecondary"
            >
                {t('home.popular')}
            </Typography>
            <ProductSlider
                {...{ products: popular, productService, favService }}
            />

            <Typography
                className={classes.subtitle}
                variant="h5"
                component="h2"
                color="textSecondary"
            >
                {t('home.recommended')}
            </Typography>
            <ProductSlider
                {...{ products: recommended, productService, favService }}
            />
        </>
    )
}

export default Home
