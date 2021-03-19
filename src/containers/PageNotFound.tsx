import React from 'react'

import Typography from '@material-ui/core/Typography'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation()

    return (
        <Typography className={classes.main}>{t('error.not_found')}</Typography>
    )
}

export default PageNotFound
