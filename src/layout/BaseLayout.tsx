import React from 'react'

import { Redirect, Route, Switch } from 'react-router'
import { ErrorWrapperClass, NavigationBarWrapper } from '../components'

import { NavRoute } from '../routes'
import { SessionService } from '../services'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { ServerErrorHandlerListener } from '../utils'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        base: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '100vh',
            backgroundColor: theme.palette.background.default,
        },
    })
)

interface RouteCheckProps {
    props: any
    route: NavRoute
    sessionService: SessionService
}

const CheckRedirect: React.FC<any> = ({ props, path }) => {
    return (
        <Redirect
            to={{
                pathname: path,
                state: {
                    from: props.location,
                },
            }}
        />
    )
}

const RouteCheck: React.FC<RouteCheckProps> = ({
    props,
    route,
    sessionService,
}) => {
    const { t } = useTranslation()

    const RouteComponent = route.component
    const admin = route.admin
    const identified = route.identified || admin

    const auth = sessionService.isAuth()
    const logged = sessionService.isLogged()

    if (!auth) {
        sessionService
            .auth()
            .then(() =>
                props.history.push(
                    props.location.pathname,
                    props.location.state
                )
            )
        return <></>
    }

    if (admin && !sessionService.current()?.admin)
        return <CheckRedirect path="/404" {...{ props }} />

    if (identified === true && !logged)
        return <CheckRedirect path="/login" {...{ props }} />

    document.title = t('routes.base') + t('routes.' + route.id)

    return <RouteComponent {...props} />
}

interface BaseLayoutProps {
    serverErrorHandler: ServerErrorHandlerListener
    sessionService: SessionService
    routes: NavRoute[]
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
    sessionService,
    serverErrorHandler,
    routes,
}) => {
    const classes = useStyles()

    return (
        <div className={classes.base}>
            <NavigationBarWrapper sessionService={sessionService} />

            <Switch>
                {routes.map((route) => (
                    <Route
                        key={route.id}
                        path={route.path}
                        render={(props) => (
                            <RouteCheck
                                {...{
                                    props,
                                    route,
                                    sessionService,
                                }}
                            />
                        )}
                        exact
                    />
                ))}
                <Redirect to="/404" />
            </Switch>

            <ErrorWrapperClass serverErrorHandler={serverErrorHandler} />
        </div>
    )
}

export default BaseLayout
