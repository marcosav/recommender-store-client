import { createMuiTheme } from '@material-ui/core/styles'

import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            light: blue[200],
            main: blue[600],
            dark: blue[900],
        },
        secondary: {
            light: red['A100'],
            main: red['A200'],
            dark: red['A700'],
        },
    },
})

export { theme }
