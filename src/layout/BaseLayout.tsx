import React from 'react'

import { Redirect, Route, Switch } from 'react-router'
import { ErrorAlert, NavigationBar } from '../components'

import { NavRoute } from '../routes'
import { Session, SessionService } from '../services'

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

    return route.identified === true ? (
        <Route>
            {sessionService.isLogged() ? (
                <RouteComponent {...props} />
            ) : (
                <CheckRedirect path="/login" {...{ props }} />
            )}
        </Route>
    ) : route.identified === false ? (
        <Route>
            {sessionService.isLogged() ? (
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

interface State {
    session?: Session
    error?: number
    open: boolean
}

class BaseLayout extends React.Component<BaseLayoutProps, State> {
    constructor(props: any) {
        super(props)
        this.state = { session: undefined, error: undefined, open: false }
    }

    componentDidMount() {
        this.props.serverErrorHandler.setCallback((code) =>
            this.setState({ ...this.state, error: code, open: true })
        )

        const getSession = async () => {
            if (!this.props.sessionService.isAuth)
                await this.props.sessionService.auth()
        }

        this.props.sessionService.setCallback((s) =>
            this.setState({ ...this.state, session: s })
        )

        getSession()
    }

    setOpen(open: boolean) {
        this.setState({ ...this.state, open })
    }

    render() {
        return this.state.session ? (
            <div className={this.props.classes.base}>
                <NavigationBar session={this.state.session} />
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

                <ErrorAlert
                    {...{
                        error: this.state.error,
                        setOpen: this.setOpen.bind(this),
                        open: this.state.open,
                    }}
                />
            </div>
        ) : (
            <></>
        )
    }
}

export default withStyles(styles)(BaseLayout)
