import React from 'react'

import { BrowserRouter as Router } from 'react-router-dom'

import {
    Login,
    Logout,
    Signup,
    Home,
    ProductPage,
    ProductEdit,
    PageNotFound,
    Search,
    Favorites,
    CartPage,
    VendorProfile,
    ReportsPage,
    CheckoutPage,
    OrderHistoryPage,
} from './containers'

import { BaseLayout } from './layout'
import { useSessionService } from './services'
import { useServerErrorHandler } from './utils'

export interface NavRoute {
    id: string
    path: string
    component: React.FC<any>
    identified?: boolean
    admin?: boolean
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
        id: 'vendor',
        path: '/vendor/:id',
        component: VendorProfile,
    },
    {
        id: 'cart',
        path: '/cart',
        component: CartPage,
    },
    {
        id: 'product_publish',
        path: '/product/publish',
        component: ProductEdit,
        identified: true,
    },
    {
        id: 'product',
        path: '/product/:id',
        component: ProductPage,
    },
    {
        id: 'product_edit',
        path: '/product/:id/edit',
        component: ProductEdit,
        identified: true,
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
        identified: true,
    },
    {
        id: 'signup',
        path: '/signup',
        component: Signup,
    },
    {
        id: 'profile',
        path: '/profile',
        component: VendorProfile,
        identified: true,
    },
    {
        id: 'profile_edit',
        path: '/profile/edit/:id?',
        component: Signup,
        identified: true,
    },
    {
        id: 'favorites',
        path: '/favorites',
        component: Favorites,
        identified: true,
    },
    {
        id: 'reports',
        path: '/reports/:id?',
        component: ReportsPage,
        admin: true,
    },
    {
        id: 'checkout',
        path: '/checkout',
        component: CheckoutPage,
        identified: true,
    },
    {
        id: 'history',
        path: '/history/:id?',
        component: OrderHistoryPage,
        identified: true,
    },
    {
        id: '404',
        path: '/404',
        component: PageNotFound,
    },
]

const Routes = () => {
    const sessionService = useSessionService()
    const serverErrorHandler = useServerErrorHandler()

    return (
        <Router>
            <BaseLayout
                serverErrorHandler={serverErrorHandler}
                sessionService={sessionService}
                routes={routes}
            />
        </Router>
    )
}

export default Routes
