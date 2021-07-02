import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            margin: theme.spacing(10, 0, 5),
            textAlign: 'center',
            fontWeight: 400,
            color: theme.palette.background.default,
            textShadow: '2px 2px 2px #00000088',
            zIndex: 0,
        },
        subtitle: {
            margin: theme.spacing(2, 'auto', 0, 'auto'),
            paddingLeft: theme.spacing(2),
            maxWidth: 1800,
            fontSize: 28,
            fontWeight: 400,
        },
        categories: {
            marginLeft: 'auto',
            marginRight: 'auto',
            '& > div': {
                margin: theme.spacing(0.5),
                padding: theme.spacing(3, 0),
                '& > span': {
                    fontWeight: 'bold',
                },
                boxShadow: '0px .5px .5px #00000055',
            },
            display: 'flex',
            maxWidth: '100%',
            justifyContent: 'center',
            padding: theme.spacing(0, 1),
            flexWrap: 'wrap',
        },
        slider: {
            margin: '0 auto auto',
            maxWidth: '100%',
        },
        topContainer: {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'clip',
            padding: theme.spacing(4, 1, 8, 1),
            margin: theme.spacing(0, 0, 2),
            position: 'relative',
        },
        mainImgHolder: {
            backgroundImage: 'url(img/home_bkg.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            filter: 'blur(3px)',
            transform: 'scale(1.06) translateY(-30px)',
            width: '100%',
            height: '100%',
            position: 'absolute',
        },
    })
)
