import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            minWidth: 220,
            display: 'flex',
            flexDirection: 'column',
            margin: theme.spacing(0, 2, 2, 0),
        },
        actions: {
            marginTop: theme.spacing(1),
            display: 'flex',
            padding: theme.spacing(1),
            alignItems: 'center',
        },
        username: {
            marginLeft: 'auto',
            fontWeight: 'bold',
            cursor: 'pointer',
        },
        button: {
            padding: 6,
        },
        avatar: {
            margin: 'auto',
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            height: theme.spacing(24),
            width: theme.spacing(24),
            fontSize: '3em',
            '& img': {
                display: 'block',
                width: '100%',
            },
        },
    })
)
