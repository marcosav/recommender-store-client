import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toggler: {
            marginLeft: 'auto',
            marginRight: theme.spacing(3),
            maxHeight: theme.spacing(5),
            transform: 'translateY(-50%)',
            background: 'white',
            [theme.breakpoints.down(520)]: {
                margin: theme.spacing(3, 2, 3),
                marginLeft: 'auto',
                transform: 'none',
            },
        },
        container: {
            marginTop: theme.spacing(4),
        },
    })
)
