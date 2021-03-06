import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'row',
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
            },
            marginBottom: theme.spacing(1),
        },
        buttons: {
            margin: theme.spacing(1),
            marginLeft: 'auto',
            padding: theme.spacing(1, 5),
        },
        upload: {
            position: 'relative',
            margin: 'auto',
            transform: 'translateY(-25%)',
            '& > input': {
                display: 'none',
            },
            '& > span': {
                maxWidth: theme.spacing(20),
                alignSelf: 'center',
                textAlign: 'center',
            },
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.down('xs')]: {
                transform: 'translateY(0%)',
                marginBottom: theme.spacing(2),
            },
        },
        deleteImage: {
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 2,
        },
        avatar: {
            height: theme.spacing(20),
            width: theme.spacing(20),
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    })
)
