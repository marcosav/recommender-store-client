import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(4, 8),
            [theme.breakpoints.down('sm')]: {
                margin: theme.spacing(2),
            },
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: theme.spacing(2),
            alignItems: 'center',
        },
        title: {
            marginLeft: theme.spacing(1),
        },
        images: {
            width: '65%',
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                margin: theme.spacing(0, 0, 2, -0.5),
            },
            display: 'grid',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: theme.spacing(2),
            gridTemplateColumns: 'repeat(4, 1fr)',
            '& img': {
                display: 'block',
                width: '100%',
            },
        },
        deleteImage: {
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1,
        },
        imagePreview: {},
        holder: {
            position: 'relative',
            margin: theme.spacing(0, 0, 1, 1),
            backgroundColor: '#f5f5f5',
            justifyItems: 'center',
            alignItems: 'center',
            display: 'flex',
            '& > input': {
                display: 'none',
            },
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    })
)
