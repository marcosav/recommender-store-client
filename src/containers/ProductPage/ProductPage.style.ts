import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        subtitle: {
            margin: theme.spacing(2, 'auto', 0, 'auto'),
            paddingLeft: theme.spacing(2),
            maxWidth: 1800,
            fontWeight: 100,
        },
        bottom: {
            marginTop: theme.spacing(2),
        },
    })
)
