import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(1),
            marginBottom: theme.spacing(1),
            display: 'flex',
            flexDirection: 'row',
            minHeight: 200,
            maxHeight: 250,
            [theme.breakpoints.down('xs')]: {
                height: 400,
                display: 'grid',
                gridTemplateRows: '200px 200px',
            },
        },
        title: {
            display: 'flex',
            '& > h2': {
                cursor: 'pointer',
            },
            '& > *': {
                alignSelf: 'center',
            },
            '& > p': {
                marginLeft: theme.spacing(1),
            },
        },
        imageContainer: {
            margin: theme.spacing(1),
            alignSelf: 'center',
            minWidth: 250,
            display: 'flex',
            '& img': {
                maxWidth: 250,
                maxHeight: 175,
                display: 'block',
                borderRadius: 4,
            },
        },
        image: {
            margin: 'auto',
            backgroundColor: theme.palette.grey[100],
            '& > button': {
                borderRadius: 4,
            },
        },
        content: {
            padding: theme.spacing(1, 0),
            marginLeft: theme.spacing(1),
            flexBasis: '100%',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        },
        amount: {
            display: 'flex',
            alignItems: 'center',
        },
        subtotal: {
            textAlign: 'end',
            margin: theme.spacing(0.5),
        },
        actions: {
            marginTop: 'auto',
        },
    })
)
