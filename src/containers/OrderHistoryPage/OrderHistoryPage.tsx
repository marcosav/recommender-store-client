import React from 'react'

import { Redirect, RouteComponentProps } from 'react-router'

import {
    useOrdersService,
    useUserService,
    useSessionService,
    useResourceService,
} from '../../services'

import { useTranslation } from 'react-i18next'

import { useStyles } from './OrderHistoryPage.style'
import { Order, User } from '../../types'
import { ContentWarn, PageContainer } from '../../components'

import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import HistoryIcon from '@material-ui/icons/History'

import { HttpStatusCode } from '../../utils'
import OrderHolder from './components'

interface OrderHistoryPageParams {
    id?: string
}

const OrderHistoryPage: React.FC<
    RouteComponentProps<OrderHistoryPageParams>
> = ({ match, history, location }) => {
    const { t } = useTranslation()

    const { id } = match.params

    const state = location.state as any
    const completedOrder = state?.done

    const orderService = useOrdersService()
    const userService = useUserService()
    const sessionService = useSessionService()
    const resources = useResourceService()

    const session = sessionService.current()

    const _id = parseInt(id ?? '')
    const userId = isNaN(_id) || !session?.admin ? undefined : _id

    const [user, setUser] = React.useState<User>()

    const classes = useStyles()

    React.useEffect(() => {
        const fetchUser = async () => {
            const r = await userService.getUser(userId!!)

            switch (r.status) {
                case HttpStatusCode.OK:
                    setUser(r.data)
                    break
                case HttpStatusCode.NotFound:
                    history.push('/404')
            }
        }

        if (userId) fetchUser()
    }, [history, userId, userService])

    const NoHistory = () => (
        <ContentWarn>
            <HistoryIcon />
            <Typography>{t('history.empty')}</Typography>
        </ContentWarn>
    )

    if (id && !session?.admin) return <Redirect to={'/history'} />

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <Typography variant="h3" component="h1">
                    {t('history.title')}
                </Typography>
                {userId && user && (
                    <Typography
                        variant="h6"
                        component="h2"
                        color="textSecondary"
                    >
                        {user.nickname}
                    </Typography>
                )}
            </header>

            {completedOrder !== undefined && (
                <Alert severity="success" className={classes.orderSuccess}>
                    {t('checkout.success').replace('{0}', completedOrder)}
                </Alert>
            )}

            <PageContainer
                request={(page) => orderService.getForUser({ page, userId })}
                itemRender={(order: Order) => (
                    <OrderHolder
                        key={order.id}
                        {...{ order, resources, history }}
                    />
                )}
                EmptyComponent={NoHistory}
                ContainerComponent={({ children }) => (
                    <div className={classes.container}>{children}</div>
                )}
                {...{
                    setShownItems: () => undefined,
                    deps: [],
                }}
            />
        </div>
    )
}

export default OrderHistoryPage
