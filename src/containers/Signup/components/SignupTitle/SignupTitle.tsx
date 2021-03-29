import React from 'react'

import Typography from '@material-ui/core/Typography'

import { useHistory } from 'react-router'

import { useStyles } from './SignupTitle.style'

import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

const SignupTitle = () => {
    const { t } = useTranslation()

    const history = useHistory()
    const classes = useStyles()

    const login = () => history.push('/login')

    return (
        <header className={classes.header}>
            <Typography className={classes.title} variant="h3" component="h1">
                {t('signup.title')}
            </Typography>
            <div className={classes.subtitleContainer}>
                <Typography
                    className={classes.subtitle}
                    variant="h5"
                    component="h2"
                >
                    {t('signup.subtitle')}
                </Typography>
                <Typography
                    onClick={login}
                    className={clsx(classes.subtitle, classes.subtitleLogin)}
                    variant="h5"
                    component="h2"
                >
                    {t('login.title')}
                </Typography>
            </div>
        </header>
    )
}

export default SignupTitle
