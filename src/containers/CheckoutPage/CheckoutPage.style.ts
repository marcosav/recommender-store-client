import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        form: {
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(0, 1, 0, 2),
            '& > h2': {
                marginBottom: theme.spacing(1),
            },
        },
        summary: {
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            width: 200,
            maxHeight: 200,
            '& > *': {
                margin: '6px auto auto auto',
            },
            padding: theme.spacing(2, 0),
        },
        pair: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
        },
        input: {
            margin: theme.spacing(0, 2, 2, 0),
        },
        header: {
            margin: theme.spacing(4),
            userSelect: 'none',
        },
        title: {
            fontWeight: 'bold',
        },
    })
)
