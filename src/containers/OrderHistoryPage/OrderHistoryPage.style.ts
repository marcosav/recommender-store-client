import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
        },
        header: {
            margin: theme.spacing(4),
        },
        container: {
            width: '100%',
            maxWidth: 1000,
        },
        orderSuccess: {
            padding: theme.spacing(2),
            margin: theme.spacing(2),
        },
    })
)
