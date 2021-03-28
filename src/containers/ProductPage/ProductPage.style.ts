import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        bottom: {
            marginTop: theme.spacing(2),
            '& > h2': {
                margin: theme.spacing(2),
            }
        }
    })
)
