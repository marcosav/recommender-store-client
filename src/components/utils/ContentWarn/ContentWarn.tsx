import React from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            userSelect: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: theme.palette.grey[400],
            margin: 'auto',
            '& > p': {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 36,
            },
            '& > svg': {
                fontSize: 130,
            },
        },
    })
)

interface Props {
    children: React.ReactNode
}

const ContentWarn: React.FC<Props> = ({ children }) => {
    const classes = useStyles()

    return <div className={classes.root}>{children}</div>
}

export default ContentWarn
