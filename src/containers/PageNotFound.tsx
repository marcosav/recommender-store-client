import React from 'react'

import Typography from '@material-ui/core/Typography'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            margin: 'auto',
            userSelect: 'none',
            fontSize: 'xxx-large',
            color: theme.palette.grey[400],
        },
    })
)

const PageNotFound = () => {
    const classes = useStyle()
    return <Typography className={classes.main}>Not found | 404</Typography>
}

export default PageNotFound
