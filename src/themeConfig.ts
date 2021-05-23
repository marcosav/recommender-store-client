import { createMuiTheme } from '@material-ui/core/styles'

import blue from '@material-ui/core/colors/blue'
import orange from '@material-ui/core/colors/orange'

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            light: blue[200],
            main: blue[600],
            dark: blue[900],
        },
        secondary: {
            light: orange['A100'],
            main: orange['A200'],
            dark: orange['A700'],
        },
    },
})

export { theme }
