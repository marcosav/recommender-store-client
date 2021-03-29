import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '48ch',
            marginLeft: 'auto',
            marginRight: theme.spacing(8),
            [theme.breakpoints.down('sm')]: {
                marginRight: theme.spacing(2),
            },
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
        buttons: {
            margin: theme.spacing(1),
            marginLeft: 'auto',
            padding: theme.spacing(1, 5),
        },
        input: {
            margin: theme.spacing(1),
        },
        bottom: {
            marginLeft: 'auto',
        },
        loader: {
            margin: 'auto',
        },
    })
)
