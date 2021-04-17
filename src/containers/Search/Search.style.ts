import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        controls: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: 'calc(100% - 32px)',
            margin: theme.spacing(0, 4, 2, 4),
            [theme.breakpoints.down('xs')]: {
                width: 'calc(100% - 16px)',
                margin: theme.spacing(0, 2, 2, 2),
            },
        },
        categories: {
            margin: theme.spacing(1, 0.5),
            '& > div': {
                margin: theme.spacing(0.5),
            },
            display: 'flex',
            maxWidth: '100%',
            overflowX: 'auto',
        },
        filterInput: {
            width: 200,
        },
    })
)
