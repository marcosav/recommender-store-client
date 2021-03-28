import React from 'react'

import Routes from './routes'

import ThemeProvider from '@material-ui/styles/ThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'
import deepPurple from '@material-ui/core/colors/blue'
import blue from '@material-ui/core/colors/red'

const theme = createMuiTheme({
    palette: {
        //type: 'dark',
        primary: {
            light: deepPurple[200],
            main: deepPurple[600],
            dark: deepPurple[900],
        },
        secondary: {
            light: blue['A100'],
            main: blue['A200'],
            dark: blue['A700'],
        },
    },
})

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Routes />
        </ThemeProvider>
    )
}

export default App
