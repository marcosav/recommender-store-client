import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        container: {
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 300px)',
            [theme.breakpoints.up(490)]: {
                gridTemplateColumns: 'repeat(2, 1fr)',
            },
            [theme.breakpoints.up(730)]: {
                gridTemplateColumns: 'repeat(3, 1fr)',
            },
            [theme.breakpoints.up('md')]: {
                gridTemplateColumns: 'repeat(4, 1fr)',
            },
            [theme.breakpoints.up('lg')]: {
                gridTemplateColumns: 'repeat(5, 1fr)',
            },
            [theme.breakpoints.up(1600)]: {
                gridTemplateColumns: 'repeat(6, 1fr)',
            },
            margin: theme.spacing(0, 0, 1, 2),
        },
        pagger: {
            margin: theme.spacing(2),
        },
    })
)
