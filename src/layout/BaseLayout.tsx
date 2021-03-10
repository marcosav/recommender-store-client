import React from 'react'

import { Redirect, Route, Switch } from 'react-router'
import { NavigationBar } from '../components'

import styled from 'styled-components'

import { NavRoute } from '../routes'
import { useSession } from '../services'

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
    const session = useSession()

    console.debug("base")
    if (!session.isAuth)
        session.auth()

    return (
        <Container>
            <NavigationBar />
            <Switch>
                {routes.map((route) => {
                    return (
                        <Route
                            key={route.id}
                            path={route.path}
                            component={route.component}
                            exact
                        />
                    )
                })}
                <Redirect to="/404" />
            </Switch>
        </Container>
    )
}

export default BaseLayout
