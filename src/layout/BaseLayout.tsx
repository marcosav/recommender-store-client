import React from 'react'

import { Redirect, Route, Switch } from 'react-router'
import { ErrorWrapperClass, NavigationBarWrapper } from '../components'

import { NavRoute } from '../routes'
import { SessionService } from '../services'

import { withStyles, createStyles, WithStyles } from '@material-ui/core'
import { ServerErrorHandlerListener } from '../utils'

const styles = () =>
    createStyles({
        base: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '100vh',
        },
    })

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
    const RouteComponent = route.component
    const admin = route.admin
    const identified = route.identified || admin

    const logged = sessionService.isLogged()

    return identified === true ? (
        <Route>
            {logged ? (
                <RouteComponent {...props} />
            ) : (
                <CheckRedirect path="/login" {...{ props }} />
            )}
        </Route>
    ) : identified === false ? (
        <Route>
            {logged ? (
                <CheckRedirect path="/" {...{ props }} />
            ) : (
                <RouteComponent {...props} />
            )}
        </Route>
    ) : (
        <RouteComponent {...props} />
    )
}

interface BaseLayoutProps extends WithStyles<typeof styles> {
    serverErrorHandler: ServerErrorHandlerListener
    sessionService: SessionService
    routes: NavRoute[]
}

class BaseLayout extends React.Component<BaseLayoutProps> {
    render() {
        return (
            <div className={this.props.classes.base}>
                <NavigationBarWrapper
                    sessionService={this.props.sessionService}
                />
                <Switch>
                    {this.props.routes.map((route) => (
                        <Route
                            key={route.id}
                            path={route.path}
                            render={(props) => (
                                <RouteCheck
                                    {...{
                                        props,
                                        route,
                                        sessionService: this.props
                                            .sessionService,
                                    }}
                                />
                            )}
                            exact
                        />
                    ))}
                    <Redirect to="/404" />
                </Switch>

                <ErrorWrapperClass
                    serverErrorHandler={this.props.serverErrorHandler}
                />
            </div>
        )
    }
}

export default withStyles(styles)(BaseLayout)
