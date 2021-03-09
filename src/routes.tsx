import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import {
    Login,
    Logout,
    Signup,
    Home,
    ProductPage,
    PageNotFound,
    Search,
} from './containers'

import { BaseLayout } from './layout'

export interface NavRoute {
    id: string
    path: string
    component: React.FC<any>
}

const routes: NavRoute[] = [
    {
        id: 'home',
        path: '/',
        component: Home,
    },
    {
        id: 'search',
        path: '/search/:query',
        component: Search,
    },
    {
        id: 'product',
        path: '/product/:id',
        component: ProductPage,
    },
    {
        id: 'vendor',
        path: '/vendor/:id',
        component: () => null,
    },
    {
        id: 'cart',
        path: '/cart',
        component: () => null,
    },
    {
        id: 'product',
        path: '/product/:id/edit',
        component: () => null, //same
    },
    {
        id: 'product',
        path: '/product/publish',
        component: () => null, //same
    },
    {
        id: 'login',
        path: '/login',
        component: Login,
    },
    {
        id: 'logout',
        path: '/logout',
        component: Logout,
    },
    {
        id: 'signup',
        path: '/signup',
        component: Signup,
    },
    {
        id: 'profile',
        path: '/profile',
        component: () => null,
    },
    {
        id: 'favorites',
        path: '/favorites',
        component: () => null,
    },
    {
        id: '404',
        path: '/404',
        component: PageNotFound,
    },
]

const Routes = () => (
    <Router>
        <BaseLayout routes={routes} />
    </Router>
)

export default Routes
