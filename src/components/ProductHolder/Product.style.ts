import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            minWidth: 220,
            height: 270,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            margin: theme.spacing(0, 2, 2, 0),
        },
        media: {
            height: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: theme.palette.grey[100],
        },
        actions: {
            height: 40,
            zIndex: 1,
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            position: 'absolute',
            bottom: 0,
            padding: theme.spacing(1),
        },
        topActions: {
            zIndex: 1,
            position: 'absolute',
            backgroundColor: '#00000044',
            margin: theme.spacing(1),
            borderRadius: theme.spacing(2),
            padding: theme.spacing(0, 0.1),
        },
        chip: {
            '& > span': {
                color: theme.palette.grey[50],
                fontSize: 15,
                fontWeight: 'bold',
                textShadow: '.5px .5px .5px #00000088',
            },
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1,
            height: 30,
            margin: theme.spacing(1),
        },
        product: {
            height: '100%',
        },
        title: {
            marginLeft: 'auto',
            fontWeight: 'bold',
            color: theme.palette.grey[50],
            fontSize: 15,
            textShadow: '.5px .5px .5px #00000088',
            maxHeight: 45,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },
    })
)
