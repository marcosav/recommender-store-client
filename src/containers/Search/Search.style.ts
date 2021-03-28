import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > h1': {
                margin: theme.spacing(0, 0, 2, 4),
                alignSelf: 'normal'
            }
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
    })
)
