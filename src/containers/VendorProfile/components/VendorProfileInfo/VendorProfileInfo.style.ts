import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        top: {
            position: 'relative',
            display: 'flex',
            margin: theme.spacing(4),
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        topText: {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(2),
            maxWidth: '100%',
            '& > p': {
                overflowWrap: 'break-word',
            },
        },
        avatar: {
            marginRight: 'auto',
            marginLeft: 'auto',
            marginBottom: theme.spacing(2),
            height: theme.spacing(24),
            width: theme.spacing(24),
            fontSize: '3em',
            '& img': {
                display: 'block',
                width: '100%',
            },
        },
        buttons: {
            position: 'absolute',
            display: 'flex',
            top: theme.spacing(-2),
            right: theme.spacing(-2),
            zIndex: 1,
            borderRadius: '100px',
            padding: theme.spacing(0.5),
        },
        title: {
            position: 'absolute',
            bottom: theme.spacing(-4 - 2),
            padding: theme.spacing(0, 2),
            background: theme.palette.background.paper,
            userSelect: 'none',
        },
    })
)
