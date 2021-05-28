import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            margin: 'auto',
            padding: theme.spacing(1),
            display: 'flex',
            maxWidth: 'calc(100% - 16px)',
            width: '46ch',
            flexDirection: 'column',
            transform: 'translateY(-35%)',
            [theme.breakpoints.down('sm')]: {
                transform: 'translateY(-20%)',
            },
        },
        buttons: {
            marginTop: theme.spacing(1),
            '& > button:last-child': {
                marginLeft: theme.spacing(1),
            },
            gridTemplateColumns: '1fr 1fr',
            display: 'grid',
        },
        input: {
            margin: theme.spacing(1, 0),
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 4,
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
    })
)
