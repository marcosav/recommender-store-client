import React from 'react'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { useUserService } from '../../services'

import { useStyles } from './Login.style'
import { PasswordField } from '../../components'

import { RouteComponentProps } from 'react-router'
import { HttpStatusCode } from '../../utils'
import { useTranslation } from 'react-i18next'

const Login: React.FC<RouteComponentProps> = ({ history }) => {
    const userService = useUserService()
    const { t } = useTranslation()

    const classes = useStyles()

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [error, setError] = React.useState(false)

    const doLogin = async (e: any) => {
        e.preventDefault()

        const r = await userService.login({ username, password })

        switch (r.status) {
            case HttpStatusCode.OK:
            case HttpStatusCode.NoContent:
                history.push('/')
                break
            default:
                setError(true)
                break
        }
    }

    const register = () => history.push('/signup')

    return (
        <>
            <header className={classes.header}>
                <Typography
                    className={classes.title}
                    variant="h3"
                    component="h1"
                >
                    {t('login.title')}
                </Typography>
                <Typography
                    className={classes.subtitle}
                    variant="h5"
                    component="h2"
                >
                    {t('login.subtitle')}
                </Typography>
            </header>
            <form
                className={classes.form}
                onSubmitCapture={doLogin}
                noValidate
                autoComplete="off"
            >
                <TextField
                    className={classes.input}
                    label={t('login.field.username')}
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={error}
                />
                <PasswordField
                    className={classes.input}
                    label={t('login.field.password')}
                    error={error}
                    helperText={error ? t('login.field.incorrect') : ''}
                    {...{ password, setPassword }}
                />
                <div className={classes.buttons}>
                    <Button
                        disableElevation
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                    >
                        {t('login.title')}
                    </Button>
                    <Button variant="outlined" onClick={register}>
                        {t('signup.title')}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Login
