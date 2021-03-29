import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            minWidth: 220,
            height: 270,
            display: 'flex',
            flexDirection: 'column',
            margin: theme.spacing(0, 2, 2, 0),
        },
        media: {
            height: 220,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: theme.palette.grey[100],
        },
        actions: {
            height: '100%',
            /*background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',*/
        },
        titleChip: {
            '& > span': {
                color: theme.palette.grey[50],
                fontSize: 16,
                fontWeight: 'bold',
                textShadow: '.5px .5px .5px black',
            },
            maxWidth: 220,
            margin: theme.spacing(1),
            //backgroundColor: '#00000033',
        },
        price: {
            marginLeft: 'auto',
            fontWeight: 'bold',
        },
    })
)
