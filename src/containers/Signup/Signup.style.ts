import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'row',
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
            },
        },
        buttons: {
            margin: theme.spacing(1),
            marginLeft: 'auto',
            padding: theme.spacing(1, 5),
        },
        header: {
            margin: theme.spacing(4),
            userSelect: 'none',
        },
        title: {
            color: theme.palette.grey[800],
            fontWeight: 'bold',
        },
        subtitle: {
            color: theme.palette.grey[500],
            fontWeight: 'lighter',
        },
        subtitleLogin: {
            cursor: 'pointer',
            textDecoration: 'underline',
            marginLeft: theme.spacing(1),
        },
        subtitleContainer: {
            display: 'flex',
        },
        upload: {
            margin: 'auto',
            transform: 'translateY(-25%)',
            '& > input': {
                display: 'none',
            },
            '& > span': {
                maxWidth: theme.spacing(20),
                alignSelf: 'center',
                textAlign: 'center',
            },
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.down('xs')]: {
                transform: 'translateY(0%)',
                marginBottom: theme.spacing(2),
            },
        },
        avatar: {
            height: theme.spacing(20),
            width: theme.spacing(20),
        },
    })
)
