import React from 'react'

import Routes from './routes'

import ThemeProvider from '@material-ui/styles/ThemeProvider'

import { theme } from './themeConfig'

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Routes />
        </ThemeProvider>
    )
}

export default App
