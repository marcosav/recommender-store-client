import React from 'react'

import { Route, Switch } from 'react-router'
import { NavigationBar } from '../components'

import styled from 'styled-components'

import { NavRoute } from '../routes'
import { useSessionService } from '../services'
import { Session } from '../services/session'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    min-height: 100vh;
`

interface BaseLayoutProps {
    routes: NavRoute[]
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ routes }) => {
    const sessionService = useSessionService()

    const [session, setSession] = React.useState<Session>()

    console.debug('base')

    React.useEffect(() => {
        const getSession = async () => {
            if (!sessionService.isAuth) await sessionService.auth()
        }

        sessionService.setCallback((s) => {
            console.debug(s)
            setSession(s)
        })
        getSession()
    }, [sessionService, setSession])

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
                            render={() => <RouteComponent {...{ session }} />}
                            exact
                        />
                    )
                })}
            </Switch>
        </Container>
    ) : (
        <></>
    )
}

export default BaseLayout
