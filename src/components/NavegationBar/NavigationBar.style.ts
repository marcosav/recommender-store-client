import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        searchContainer: {
            width: '100%',
        },
        search: {
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            color: 'white',
            transition: theme.transitions.create('background'),
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            margin: 'auto',
            width: '35ch',
            [theme.breakpoints.down('xs')]: {
                marginLeft: theme.spacing(0),
                width: '100%',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
        },
        inputButton: {
            padding: 10,
            color: 'white',
        },
        inputRoot: {
            color: 'inherit',
            width: '100%',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        },
        avatar: {
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
        menuText: {
            margin: theme.spacing(0, 2),
        },
        usernameMenu: {
            fontWeight: 'bold',
        },
        divider: {
            margin: theme.spacing(1, 0, 1, 0),
        },
    })
)
