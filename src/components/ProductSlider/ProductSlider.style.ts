import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            margin: theme.spacing(2, 'auto', 0, 'auto'),
            padding: theme.spacing(0, 0, 0, 2),
            maxWidth: 1800,
            minHeight: 220,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },
        endGap: {
            minWidth: 1,
        },
    })
)
