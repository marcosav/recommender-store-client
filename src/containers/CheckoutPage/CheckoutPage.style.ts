import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1, 'auto', 2),
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        form: {
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(0, 1, 0, 2),
            '& > h2': {
                marginBottom: theme.spacing(2),
            },
        },
        summary: {
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            width: 200,
            maxHeight: 200,
            '& > *': {
                margin: '6px auto auto auto',
            },
            padding: theme.spacing(2, 0),
        },
        pair: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
        },
        input: {
            margin: theme.spacing(0, 2, 2, 0),
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            margin: theme.spacing(4),
            alignItems: 'center',
            userSelect: 'none',
        },
        title: {
            marginLeft: theme.spacing(1),
        },
        addressesTitle: {
            margin: theme.spacing(0, 0, 1, 2),
        },
        addressButton: {
            margin: theme.spacing(1, 1, 3, 1),
            borderRadius: 4,
            cursor: 'pointer',
        },
        addressContainer: {
            display: 'flex',
            flexDirection: 'row',
            padding: theme.spacing(0, 0, 0, 2),
            overflowX: 'auto',
            flexWrap: 'nowrap',
        },
        addressHolder: {
            padding: theme.spacing(1),
            width: 180,
            minWidth: 180,
            height: 90,
            overflow: 'hidden',
        },
        endGap: {
            minWidth: theme.spacing(2),
        },
    })
)
