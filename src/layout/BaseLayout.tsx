import React from 'react'

import { Redirect, Route, Switch } from 'react-router'
import { ErrorModal, NavigationBar } from '../components'

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

interface BaseLayoutProps extends WithStyles<typeof styles> {
    serverErrorHandler: ServerErrorHandlerListener
    sessionService: SessionService
    routes: NavRoute[]
}

interface State {
    session?: Session
    error: boolean
}

class BaseLayout extends React.Component<BaseLayoutProps, State> {
    constructor(props: any) {
        super(props)
        this.state = { session: undefined, error: false }
    }

    componentDidMount() {
        this.props.serverErrorHandler.setCallback(() =>
            this.setState({ ...this.state, error: true })
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
        this.setState({ ...this.state, error: open })
    }

    render() {
        return this.state.session ? (
            <div className={this.props.classes.base}>
                <NavigationBar session={this.state.session} />
                <Switch>
                    {this.props.routes.map((route) => {
                        const RouteComponent = route.component
                        return (
                            <Route
                                key={route.id}
                                path={route.path}
                                render={(props) => (
                                    <RouteComponent
                                        {...props}
                                        session={this.state.session}
                                    />
                                )}
                                exact
                            />
                        )
                    })}
                    <Redirect to="/404" />
                </Switch>

                <ErrorModal
                    {...{
                        open: this.state.error,
                        setOpen: this.setOpen.bind(this),
                    }}
                />
            </div>
        ) : (
            <></>
        )
    }
}

export default withStyles(styles)(BaseLayout)
