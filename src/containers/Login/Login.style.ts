import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            transform: 'translateY(-35%)',
            [theme.breakpoints.down('sm')]: {
                transform: 'translateY(-20%)',
            }
        },
        buttons: {
            '& > button': {
                margin: theme.spacing(1),
            },
            gridTemplateColumns: '1fr 1fr',
            display: 'grid',
        },
        input: {
            margin: theme.spacing(1),
            width: '42ch',
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
