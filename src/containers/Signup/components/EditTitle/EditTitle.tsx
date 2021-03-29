import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { useHistory } from 'react-router'

import { useStyles } from './EditTitle.style'

import { useTranslation } from 'react-i18next'

const EditTitle = () => {
    const { t } = useTranslation()

    const history = useHistory()
    const classes = useStyles()

    const goBack = () => history.goBack()

    return (
        <header className={classes.header}>
            <IconButton onClick={() => goBack()}>
                <ArrowBackIcon />
            </IconButton>
            <Typography className={classes.title} variant="h4" component="h1">
                {t('profile.edit.title')}
            </Typography>
        </header>
    )
}

export default EditTitle
