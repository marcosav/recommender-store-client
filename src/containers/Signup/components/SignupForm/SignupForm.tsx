import React from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { useTranslation } from 'react-i18next'

import {
    CircularProgressIndicator,
    PasswordField,
} from '../../../../components'
import { SignupForm } from '../../../../api/UserAPI'

import { useStyles } from './Signup.style'

interface SignupFormProps {
    doSignup: (e: any) => void
    data: SignupForm
    setData: (data: any) => void
    errors: any
    uploadProgress: number
}

const SignupFormComponent: React.FC<SignupFormProps> = ({
    doSignup,
    data,
    setData,
    errors,
    uploadProgress,
}) => {
    const { t } = useTranslation()

    const classes = useStyles()

    const updateData = (actual: {}) => {
        setData({ ...data, ...actual })
    }

    const changeData = (field: string) => (e: any) =>
        updateData({ [field]: e.target.value })

    const errorFor = (field: string) => field in errors

    const helperFor = (field: string) => {
        const error = errors[field]
        if (error === undefined) return undefined
        const args = error.split('.')

        let msg = t(`validation.${args[0]}`)

        const details = args.slice(1)
        for (let k = 0; k < details.length; k++)
            msg = msg.replace('{' + k + '}', details[k])

        return msg
    }

    return (
        <form
            className={classes.form}
            onSubmitCapture={doSignup}
            noValidate
            autoComplete="off"
        >
            <TextField
                className={classes.input}
                label={t('signup.field.name')}
                variant="outlined"
                value={data['name']}
                onChange={changeData('name')}
                error={errorFor('name')}
                helperText={helperFor('name')}
                required
            />

            <TextField
                className={classes.input}
                label={t('signup.field.surname')}
                variant="outlined"
                value={data['surname']}
                onChange={changeData('surname')}
                error={errorFor('surname')}
                helperText={helperFor('surname')}
                required
            />

            <TextField
                className={classes.input}
                label={t('signup.field.email')}
                variant="outlined"
                value={data['email']}
                onChange={changeData('email')}
                error={errorFor('email')}
                helperText={helperFor('email')}
                required
            />

            <TextField
                className={classes.input}
                label={t('signup.field.repeatedEmail')}
                variant="outlined"
                value={data['repeatedEmail']}
                onChange={changeData('repeatedEmail')}
                error={errorFor('repeatedEmail')}
                helperText={helperFor('repeatedEmail')}
                required
            />

            <TextField
                className={classes.input}
                label={t('signup.field.nickname')}
                variant="outlined"
                value={data['nickname']}
                onChange={changeData('nickname')}
                error={errorFor('nickname')}
                helperText={helperFor('nickname')}
                required
            />

            <PasswordField
                className={classes.input}
                label={t('signup.field.password')}
                error={errorFor('password')}
                helperText={helperFor('password')}
                {...{
                    password: data.password,
                    setPassword: (p) => updateData({ password: p }),
                }}
                required
            />

            <PasswordField
                className={classes.input}
                label={t('signup.field.repeatedPassword')}
                error={errorFor('repeatedPassword')}
                helperText={helperFor('repeatedPassword')}
                {...{
                    password: data.repeatedPassword,
                    setPassword: (p) => updateData({ repeatedPassword: p }),
                }}
                required
            />

            <TextField
                className={classes.input}
                label={t('signup.field.description')}
                variant="outlined"
                value={data['description']}
                onChange={changeData('description')}
                error={errorFor('description')}
                helperText={helperFor('description')}
                multiline
                rows={5}
            />

            <div className={classes.bottom}>
                {uploadProgress !== undefined ? (
                    <CircularProgressIndicator
                        className={classes.loader}
                        value={uploadProgress}
                        size={52}
                    />
                ) : (
                    <div></div>
                )}

                <Button
                    className={classes.buttons}
                    disableElevation
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                >
                    {t('signup.title')}
                </Button>
            </div>
        </form>
    )
}

export default SignupFormComponent
