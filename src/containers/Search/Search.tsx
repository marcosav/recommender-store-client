import React from 'react'

import { RouteComponentProps } from 'react-router'

import {
    useCartService,
    useFavoriteService,
    useProductService,
} from '../../services'

import { PreviewProduct, ProductCategory } from '../../types'

import { PageContainer, ProductHolder } from '../../components'
import { HttpStatusCode } from '../../utils'
import Chip from '@material-ui/core/Chip'
import { useTranslation } from 'react-i18next'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        categories: {
            margin: theme.spacing(1, 0.5),
            '& > div': {
                margin: theme.spacing(0.5),
            },
            display: 'flex',
            maxWidth: '100%',
            overflowX: 'auto',
        },
    })
)

interface SearchParams {
    query: string
}

const Search: React.FC<RouteComponentProps<SearchParams>> = ({
    location,
    history,
    match,
}) => {
    const { query } = match.params
    const state = location?.state as any

    const { t } = useTranslation()

    const productService = useProductService()
    const cartService = useCartService()
    const favService = useFavoriteService()

    const [shownItems, setShownItems] = React.useState<PreviewProduct[]>()
    const [categories, setCategories] = React.useState<ProductCategory[]>()

    const [category, setCategory] = React.useState<any>(state?.category)

    const classes = useStyles()

    const handleCategory = (id: number) => {
        const newId = category === id ? undefined : id
        history.push(location.pathname, { category: newId, page: undefined })
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

            <PageContainer
                request={(page) =>
                    productService.searchProducts({
                        query,
                        page,
                        category,
                    })
                }
                itemRender={(product: PreviewProduct, i) => (
                    <ProductHolder
                        key={i}
                        {...{ product, cartService, favService }}
                    />
                )}
                {...{ setShownItems, deps: [category, query] }}
            />
        </div>
    )
}

export default Search
