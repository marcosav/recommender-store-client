import React from 'react'

import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'

import { RouteComponentProps } from 'react-router'

import { useUserService } from '../../services'
import { HttpStatusCode } from '../../utils'

import { SignupForm } from '../../api/UserAPI'

import { useStyles } from './Signup.style'

import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { SignupFormComponent } from './components'

const Signup: React.FC<RouteComponentProps> = ({ history }) => {
    const userService = useUserService()
    const { t } = useTranslation()

    const classes = useStyles()

    const [data, setData] = React.useState<SignupForm>({
        name: '',
        surname: '',
        email: '',
        repeatedEmail: '',
        password: '',
        repeatedPassword: '',
        nickname: '',
        description: '',
    })

    const [imagePreview, setImagePreview] = React.useState<any>()
    const [image, setImage] = React.useState<any>()

    const [errors, setErrors] = React.useState<any>({})

    const [uploadProgress, setUploadProgress] = React.useState<any>()

    const onUploadProgress = (e: any) => {
        const p = (e.loaded / e.total) * 100
        setUploadProgress(p === 100 ? undefined : p)
    }

    const doSignup = async (e: any) => {
        e.preventDefault()

        const r = await userService.signup(data, image, onUploadProgress)

        switch (r.status) {
            case HttpStatusCode.OK:
                break
            case HttpStatusCode.NoContent:
                history.push('/')
                return
            case HttpStatusCode.BadRequest:
                setErrors((r.data as any).error)
                return
        }

        const rLogin = await userService.login({
            username: data.nickname,
            password: data.password,
        })

        switch (rLogin.status) {
            case HttpStatusCode.OK:
            case HttpStatusCode.NoContent:
                history.push('/')
                break
        }
    }

    const login = () => history.push('/login')

    const selectPhoto = (e: any) => {
        const file = e.target.files[0]
        const image = URL.createObjectURL(file)
        setImagePreview(image)
        setImage(file)
    }

    return (
        <>
            <header className={classes.header}>
                <Typography
                    className={classes.title}
                    variant="h3"
                    component="h1"
                >
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
                        className={clsx(
                            classes.subtitle,
                            classes.subtitleLogin
                        )}
                        variant="h5"
                        component="h2"
                    >
                        {t('login.title')}
                    </Typography>
                </div>
            </header>

            <div className={classes.container}>
                <div className={classes.upload}>
                    <input
                        accept=".jpg,.jpeg,.png"
                        id="profile-img-upload"
                        type="file"
                        onChange={selectPhoto}
                    />
                    <label htmlFor="profile-img-upload">
                        <IconButton component="span">
                            <Avatar
                                className={classes.avatar}
                                src={imagePreview}
                            />
                        </IconButton>
                    </label>
                    <Typography
                        variant="caption"
                        color={'image' in errors ? 'error' : 'textSecondary'}
                    >
                        {t('signup.field.photo_footer')}
                    </Typography>
                </div>

                <SignupFormComponent
                    {...{ doSignup, uploadProgress, data, errors, setData }}
                />
            </div>
        </>
    )
}

export default Signup
