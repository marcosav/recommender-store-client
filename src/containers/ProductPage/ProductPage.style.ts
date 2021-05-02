import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        subtitle: {
            margin: theme.spacing(0, 'auto'),
            padding: theme.spacing(2),
            maxWidth: 1800,
        },
        bottom: {
            marginTop: theme.spacing(2),
        },
    })
)
