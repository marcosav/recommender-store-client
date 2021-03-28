import React from 'react'

import { RouteComponentProps } from 'react-router'

import {
    useCartService,
    useFavoriteService,
    useProductService,
    useResourceService,
} from '../../services'

import { PreviewProduct, ProductCategory } from '../../types'

import { PageContainer, ProductHolder } from '../../components'
import { HttpStatusCode } from '../../utils'

import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'

import { useTranslation } from 'react-i18next'

import { useStyles } from './Search.style'
import { Paged } from '../../api/types'

interface SearchParams {
    query: string
}

export interface SearchLocationState {
    category?: number
    page?: number
    all?: boolean
}

const Search: React.FC<RouteComponentProps<SearchParams>> = ({
    location,
    history,
    match,
}) => {
    const { query } = match.params
    const state = location?.state as SearchLocationState

    const { t } = useTranslation()

    const productService = useProductService()
    const cartService = useCartService()
    const favService = useFavoriteService()
    const resources = useResourceService()

    const [shownItems, setShownItems] = React.useState<Paged<PreviewProduct>>()
    const [categories, setCategories] = React.useState<ProductCategory[]>()

    const [category, setCategory] = React.useState(state?.category)

    const all = state?.all === true

    const classes = useStyles()

    const handleCategory = (id: number) => {
        const newId = category === id ? undefined : id
        history.push(location.pathname, {
            all: all ? newId !== undefined : undefined,
            category: newId,
            page: undefined,
        })
        setCategory(newId)
    }

    React.useEffect(() => {
        const fetchCategories = async () => {
            const r = await productService.findCategories()

            if (r.status === HttpStatusCode.OK) setCategories(r.data)
        }

        if (!categories) fetchCategories()
    }, [productService, categories])

    return (
        <div className={classes.root}>
            <div className={classes.categories}>
                {shownItems !== undefined &&
                    categories &&
                    categories.map((c) => (
                        <Chip
                            key={c.id}
                            color={category === c.id ? 'secondary' : undefined}
                            onClick={() => handleCategory(c.id)}
                            label={t(`category.${c.name}`)}
                        />
                    ))}
            </div>

            {shownItems !== undefined && (
                <Typography variant="h5" component="h1" color="textSecondary">
                    {t('search.found')
                        .replace('{0}', `${shownItems.total}`)
                        .replace('{1}', query)}
                </Typography>
            )}

            <PageContainer
                request={(page) =>
                    productService.searchProducts({
                        query: all ? '' : query,
                        page,
                        category,
                    })
                }
                itemRender={(product: PreviewProduct, i) => (
                    <ProductHolder
                        key={i}
                        {...{ product, cartService, favService, resources }}
                    />
                )}
                {...{ setShownItems, deps: [category, query] }}
            />
        </div>
    )
}

export default Search
