import React from 'react'

import { PreviewProduct, User } from '../../types'

import {
    useCartService,
    useFavoriteService,
    useResourceService,
} from '../../services'

import {
    ContentWarn,
    PageContainer,
    ProductHolder,
    UserHolder,
} from '../../components'

import Favorite from '@material-ui/icons/Favorite'
import Typography from '@material-ui/core/Typography'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'

import { useTranslation } from 'react-i18next'

import { useStyles } from './Favorites.style'

import { RouteComponentProps } from 'react-router'

const Favorites: React.FC<RouteComponentProps> = ({ history, location }) => {
    const favService = useFavoriteService()
    const cartService = useCartService()
    const resources = useResourceService()

    const { t } = useTranslation()
    const classes = useStyles()

    const [productOrUser, setProductOrUser] = React.useState(
        (location?.state as any)?.favType !== false
    )

    const handleType = (e: any, value: boolean) => {
        history.push(location.pathname, {
            favType: value,
            page: undefined,
        })

        setProductOrUser(value)
    }

    const Empty = () => (
        <ContentWarn>
            <Favorite />
            <Typography>{t('favorites.empty')}</Typography>
        </ContentWarn>
    )

    return (
        <>
            <div className={classes.top}>
                <Typography variant="h4" component="h1" color="textSecondary">
                    {t('favorites.title')}
                </Typography>
                <ToggleButtonGroup
                    value={productOrUser}
                    exclusive
                    onChange={handleType}
                    className={classes.toggler}
                >
                    <ToggleButton value={true}>
                        {t('favorites.products')}
                    </ToggleButton>
                    <ToggleButton value={false}>
                        {t('favorites.vendors')}
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>

            <PageContainer
                request={(page) =>
                    favService.getForUser({ page }, productOrUser)
                }
                itemRender={(item, i) =>
                    productOrUser ? (
                        <ProductHolder
                            key={i}
                            {...{
                                product: item as PreviewProduct,
                                cartService,
                                favService,
                                resources,
                            }}
                        />
                    ) : (
                        <UserHolder
                            key={i}
                            {...{
                                user: item as User,
                                favService,
                                resources,
                            }}
                        />
                    )
                }
                EmptyComponent={Empty}
                {...{ setShownItems: () => undefined, deps: [productOrUser] }}
            />
        </>
    )
}

export default Favorites
