import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        top: {
            margin: theme.spacing(2),
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr',
        },
        image: {
            margin: theme.spacing(1, 1, 0, 0),
            maxWidth: 450,
            display: 'flex',
            flexDirection: 'column',
            '& img': {
                display: 'block',
                width: '100%',
            },
        },
        images: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
        mainImage: {},
        imagePreview: {},
        holder: {
            margin: theme.spacing(0, 0, 1, 1),
        },
        details: {
            margin: theme.spacing(1, 1, 0, 0),
            paddingRight: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            '& > h1': {
                overflowWrap: 'anywhere',
            },
        },
        descriptionBuy: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: '100%',
        },
        description: {
            flexBasis: '75%',
            marginTop: theme.spacing(2),
        },
        priceRating: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
        },
        bottom: {
            marginTop: theme.spacing(2),
            '& > h2': {
                margin: theme.spacing(2),
            }
        },
        buttons: {
            display: 'flex',
            justifyContent: 'end',
            marginBottom: theme.spacing(2),
        },
        buyHolder: {
            marginTop: 'auto',
            marginBottom: 'auto',
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(2),
            '& > *': {
                margin: 'auto',
            },
        },
    })
)
