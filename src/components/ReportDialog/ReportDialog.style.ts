import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            marginTop: theme.spacing(2),
            padding: theme.spacing(0, 0, 0, 2),
        },
        endGap: {
            minWidth: 1,
        },
    })
)
