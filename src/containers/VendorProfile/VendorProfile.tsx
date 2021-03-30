import React from 'react'

import { RouteComponentProps } from 'react-router'

import {
    useCartService,
    useFavoriteService,
    useProductService,
    useResourceService,
    useSessionService,
    useUserService,
} from '../../services'

import { useTranslation } from 'react-i18next'

import { useStyles } from './VendorProfile.style'
import { PreviewProduct, User } from '../../types'
import { HttpStatusCode } from '../../utils'
import { ContentWarn, PageContainer, ProductHolder } from '../../components'

import Typography from '@material-ui/core/Typography'
import EmptyIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Divider from '@material-ui/core/Divider'
import VendorProfileInfo from './components'

interface VendorProfileParams {
    id?: string
}

const VendorProfile: React.FC<RouteComponentProps<VendorProfileParams>> = ({
    match,
    history,
    location,
}) => {
    const { id } = match.params

    const userService = useUserService()
    const productService = useProductService()
    const cartService = useCartService()
    const favService = useFavoriteService()
    const sessionService = useSessionService()
    const resources = useResourceService()

    const { t } = useTranslation()

    const classes = useStyles()

    const self = id === undefined
    const session = sessionService.current()
    const perms = self || session?.admin

    const vendorId = self ? session?.userId!! : parseInt(id!!)

    const [user, setUser] = React.useState<User>()

    const [shown, setShown] = React.useState(
        (location?.state as any)?.shown !== false
    )

    const handleShown = (e: any, value: boolean) => {
        if (perms) {
            history.push(location.pathname, {
                shown: value,
                page: undefined,
            })
            setShown(value)
        }
    }

    React.useEffect(() => {
        const handleNotFound = () => history.push('/404')

        const fetchVendor = async () => {
            const r = await userService.getUser(vendorId)

            switch (r.status) {
                case HttpStatusCode.OK:
                    setUser(r.data)
                    break
                case HttpStatusCode.Forbidden:
                    history.goBack()
                    break
                case HttpStatusCode.NotFound:
                    handleNotFound()
            }
        }

        if (isNaN(vendorId)) handleNotFound()
        else fetchVendor()
    }, [userService, vendorId, history])

    const Empty = () => (
        <ContentWarn>
            <EmptyIcon />
            <Typography>{t('profile.empty')}</Typography>
        </ContentWarn>
    )

    return (
        <>
            {user && <VendorProfileInfo {...{ user, self }} />}

            <Divider />

            {user && perms && (
                <ToggleButtonGroup
                    value={shown}
                    exclusive
                    onChange={handleShown}
                    className={classes.toggler}
                >
                    <ToggleButton value={true}>
                        {t('profile.shown')}
                    </ToggleButton>
                    <ToggleButton value={false}>
                        {t('profile.hidden')}
                    </ToggleButton>
                </ToggleButtonGroup>
            )}

            <div className={perms ? undefined : classes.container}>
                <PageContainer
                    request={(page) =>
                        productService.getVendorProducts(vendorId, shown, {
                            page,
                        })
                    }
                    itemRender={(product: PreviewProduct, i) => (
                        <ProductHolder
                            key={i}
                            {...{
                                product,
                                cartService,
                                favService,
                                resources,
                                noFav: self,
                            }}
                        />
                    )}
                    EmptyComponent={Empty}
                    {...{ setShownItems: () => undefined, deps: [shown] }}
                />
            </div>
        </>
    )
}

export default VendorProfile
