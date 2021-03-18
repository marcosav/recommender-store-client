import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            maxWidth: 300,
            height: 270,
            display: 'flex',
            flexDirection: 'column',
        },
        media: {
            height: 220,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: theme.palette.grey[100],
        },
        actions: {},
        titleChip: {
            maxWidth: '285px',
            padding: theme.spacing(0, 0.5),
            margin: theme.spacing(1),
            color: theme.palette.grey[50],
            backgroundColor: '#00000033',
            fontSize: 17,
            fontWeight: 'bold',
            textShadow: '.5px .5px .5px black',
        },
        price: {
            marginLeft: 'auto',
            fontWeight: 'bold',
        },
    })
)
