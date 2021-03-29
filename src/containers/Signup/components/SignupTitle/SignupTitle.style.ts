import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    })
)
