import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        id: {
            flexBasis: '14%',
            alignSelf: 'center',
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
        },
        product: {
            display: 'flex',
            padding: 0,
        },
        imageContainer: {
            margin: theme.spacing(1, 1, 1, 0),
            alignSelf: 'center',
            minWidth: 200,
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
            backgroundColor: '#f5f5f5',
            '& > button': {
                borderRadius: 4,
            },
        },
        data: {
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
        },
        price: {
            marginLeft: 'auto',
        },
    })
)
