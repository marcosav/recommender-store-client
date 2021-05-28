import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        top: {
            margin: theme.spacing(3, 4, 4, 4),
            display: 'flex',
            flexWrap: 'wrap',
            '& > h1': {
                margin: theme.spacing(1, 1, 0, 0),
            },
        },
        toggler: {
            margin: theme.spacing(1, 0, 'auto', 'auto'),
            maxHeight: theme.spacing(5),
            backgroundColor: theme.palette.background.paper,
        },
    })
)
