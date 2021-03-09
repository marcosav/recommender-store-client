import { Redirect, Route, Switch } from 'react-router'
import { NavigationBar } from '../components'

import styled from 'styled-components'

import { NavRoute } from '../routes'

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

const BaseLayout: React.FC<BaseLayoutProps> = ({ routes }) => (
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

export default BaseLayout
