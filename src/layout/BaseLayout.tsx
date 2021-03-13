import React from 'react'

import { Redirect, Route, Switch } from 'react-router'
import { NavigationBar } from '../components'

import styled from 'styled-components'

import { NavRoute } from '../routes'
import { SessionService, Session } from '../services'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    min-height: 100vh;
`

interface BaseLayoutProps {
    sessionService: SessionService
    routes: NavRoute[]
}

//export const SessionContext = React.createContext<any>(null)

/* sessionService.setCallback no tira, concretamente setSession ¿ctx? */
/*const BaseLayout: React.FC<BaseLayoutProps> = ({ routes }) => {
    const sessionService = useSessionService()

    const [session, setSession] = React.useState<Session>()
    const ref = React.useRef(setSession)

    console.debug('base ', session?.cart.length)

    React.useEffect(() => {
        const getSession = async () => {
            if (!sessionService.isAuth) await sessionService.auth()
        }

        sessionService.setCallback((s) => {
            console.debug('update', s)
            ref.current(s)
        })
        getSession()
    }, [sessionService, ref])

    return session ? (
        <Container>
            <NavigationBar session={session} />
            <Switch>
                {routes.map((route) => {
                    const RouteComponent = route.component
                    return (
                        <Route
                            key={route.id}
                            path={route.path}
                            render={(props) => (
                                <RouteComponent {...props} session={session} />
                            )}
                            exact
                        />
                    )
                })}
                <Redirect to="/404" />
            </Switch>
        </Container>
    ) : (
        <></>
    )
}*/

class BaseLayout extends React.Component<
    BaseLayoutProps,
    { session?: Session }
> {
    constructor(props: any) {
        super(props)
        this.state = { session: undefined }
    }

    componentDidMount() {
        const getSession = async () => {
            if (!this.props.sessionService.isAuth)
                await this.props.sessionService.auth()
        }

        this.props.sessionService.setCallback((s) => {
            console.debug('update', s)
            this.setState({ session: s })
        })
        getSession()
    }

    render() {
        return this.state.session ? (
            <Container>
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
            </Container>
        ) : (
            <></>
        )
    }
}

export default BaseLayout
