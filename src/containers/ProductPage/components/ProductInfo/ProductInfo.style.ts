import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(2),
            display: 'grid',
            [theme.breakpoints.up('md')]: {
                gridTemplateColumns: '1fr 1.5fr',
            },
        },
        image: {
            margin: 'auto',
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing(2, 2, 2, 1),
            },
            padding: theme.spacing(1, 1, 0, 0),
            display: 'flex',
            flexDirection: 'column',
            '& img': {
                display: 'block',
                width: '100%',
                borderRadius: 4,
            },
        },
        images: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            alignItems: 'center',
        },
        mainImage: {
            backgroundColor: theme.palette.grey[100],
            '& img': {
                maxHeight: 350,
                maxWidth: 450,
            },
        },
        imagePreview: {
            '& img': {
                maxHeight: 100,
                maxWidth: 110,
            },
        },
        holder: {
            margin: theme.spacing(0, 0, 1, 1),
            alignItems: 'center',
            display: 'flex',
        },
        subholder: {
            margin: 'auto',
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
        catVendorVisits: {
            display: 'flex',
        },
        visits: {
            display: 'flex',
            marginLeft: 'auto',
            '& > span': {
                marginLeft: theme.spacing(1),
            },
        },
        descriptionBuy: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: '100%',
            [theme.breakpoints.down('sm')]: {
                marginLeft: theme.spacing(2),
                flexWrap: 'wrap',
                '& > *': {
                    flexBasis: '100%',
                },
            },
        },
        description: {
            [theme.breakpoints.up('md')]: {
                flexBasis: '75%',
            },
            color: theme.palette.grey[700],
            marginTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
        },
        infoPair: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            '& > h1': {
                wordBreak: 'break-word',
            },
        },
        buttons: {
            display: 'flex',
            justifyContent: 'end',
            marginBottom: theme.spacing(2),
            flexWrap: 'wrap',
            marginLeft: 'auto',
        },
        buyHolder: {
            maxWidth: 200,
            margin: 'auto',
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
