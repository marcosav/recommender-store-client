import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        id: {
            flexBasis: '17%',
            alignSelf: 'center',
        },
        summary: {
            [theme.breakpoints.down('xs')]: {
                padding: theme.spacing(1),
            },
        },
        heading: {
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            color: theme.palette.text.secondary,
            flexBasis: '33.33%',
        },
        container: {
            width: '100%',
            padding: 0,
        },
        product: {
            display: 'flex',
            padding: 0,
            maxHeight: 200,
            [theme.breakpoints.down(500)]: {
                maxHeight: 400,
                display: 'grid',
                justifyContent: 'center',
                justifyItems: 'center',
                '& > div': {
                    margin: theme.spacing(1),
                },
            },
        },
        imageContainer: {
            margin: theme.spacing(1, 1, 1, 0),
            alignSelf: 'center',
            minWidth: 200,
            maxWidth: 200,
            display: 'flex',
            '& img': {
                maxWidth: 190,
                maxHeight: 140,
                display: 'block',
                borderRadius: 4,
            },
        },
        image: {
            margin: 'auto',
            backgroundColor: theme.palette.grey[100],
            '& > button': {
                borderRadius: 4,
            },
        },
        data: {
            maxHeight: 200,
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1, 0),
            },
        },
        title: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            cursor: 'pointer',
            '& > span': {
                marginRight: theme.spacing(0.5),
            },
            marginRight: theme.spacing(1),
        },
        price: {
            marginLeft: 'auto',
        },
        address: {
            display: 'flex',
            flexWrap: 'wrap',
            marginBottom: theme.spacing(2),
        },
        addressValues: {
            display: 'flex',
            flexDirection: 'row',
            flexBasis: '40%',
            margin: theme.spacing(0.25, 1),
            '& > span': {
                marginRight: 4,
            },
        },
    })
)
