import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            display: 'flex',
            flexDirection: 'row',
            margin: theme.spacing(4, 3, 2, 4),
            alignItems: 'center',
        },
        title: {
            marginLeft: theme.spacing(1),
        },
    })
)
