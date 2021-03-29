import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        top: {
            margin: theme.spacing(4),
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
        },
        toggler: {
            margin: 'auto 0 auto auto',
            maxHeight: theme.spacing(5),
        },
    })
)
