import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            margin: theme.spacing(3),
            textAlign: 'center',
        },
        subtitle: {
            margin: theme.spacing(2, 0, 0, 2),
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
            overflowX: 'auto',
        },
        divider: {
            margin: theme.spacing(5, 3, 2),
        },
    })
)
