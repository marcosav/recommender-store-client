import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            margin: theme.spacing(2, 4),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        title: {
            userSelect: 'none',
            marginRight: theme.spacing(1),
        },
        contentHolder: {
            display: 'flex',
        },
        list: {
            width: '100%',
            maxWidth: 1280,
            padding: theme.spacing(1),
            margin: 'auto',
        },
        buyHolder: {
            margin: theme.spacing(2, 0, 0, 'auto'),
            display: 'flex',
            flexDirection: 'column',
            width: 200,
            height: 100,
            '& > *': {
                margin: 'auto',
            },
        },
        bottom: {
            marginTop: theme.spacing(2),
            '& > h2': {
                margin: theme.spacing(2),
            },
        },
    })
)
