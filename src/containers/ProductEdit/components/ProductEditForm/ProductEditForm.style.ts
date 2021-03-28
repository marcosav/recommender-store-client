import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        buttons: {
            margin: theme.spacing(1),
            marginLeft: 'auto',
            padding: theme.spacing(1, 5),
        },
        input: {
            margin: theme.spacing(1, 0),
        },
        stock: {
            marginLeft: theme.spacing(2),
        },
        bottom: {
            marginLeft: 'auto',
        },
        loader: {
            margin: 'auto',
        },
        pair: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            '& > label': {
                marginRight: 'auto',
                marginLeft: 'auto',
            },
        },
    })
)
