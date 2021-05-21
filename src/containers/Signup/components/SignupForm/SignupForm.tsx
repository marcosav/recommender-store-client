import React from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'

import { useTranslation } from 'react-i18next'

import { PasswordField } from '../../../../components'

import { SignupForm } from '../../../../api/UserAPI'

import { useStyles } from './Signup.style'
import { ValidationTools } from '../../../../utils'

interface SignupFormProps {
    doForm: (e: any) => void
    data: SignupForm
    setData: (data: any) => void
    errors: any
    uploading: boolean
    edit: boolean
    deleteUser?: any
}

const SignupFormComponent: React.FC<SignupFormProps> = ({
    doForm,
    data,
    setData,
    errors,
    uploading,
    edit,
    deleteUser,
}) => {
    const { t } = useTranslation()

    const classes = useStyles()

    const updateData = (actual: {}) => {
        setData({ ...data, ...actual })
    }

    const changeData = (field: string) => (e: any) =>
        updateData({ [field]: e.target.value })

    const { errorFor, helperFor } = ValidationTools.createValidator(t, errors)

    return (
        <form
            id="signup-form"
            className={classes.form}
            onSubmitCapture={doForm}
            noValidate
            autoComplete="off"
        >
            <TextField
                className={classes.input}
                label={t('signup.field.name')}
                variant="outlined"
                name="name"
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
                name="surname"
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
                name="email"
                value={data['email']}
                onChange={changeData('email')}
                error={errorFor('email')}
                helperText={helperFor('email')}
                disabled={edit}
                required
            />

            {!edit && (
                <TextField
                    className={classes.input}
                    label={t('signup.field.repeatedEmail')}
                    variant="outlined"
                    name="repeatedEmail"
                    value={data['repeatedEmail']}
                    onChange={changeData('repeatedEmail')}
                    error={errorFor('repeatedEmail')}
                    helperText={helperFor('repeatedEmail')}
                    required
                />
            )}

            <TextField
                className={classes.input}
                label={t('signup.field.nickname')}
                variant="outlined"
                value={data['nickname']}
                name="nickname"
                onChange={changeData('nickname')}
                error={errorFor('nickname')}
                helperText={helperFor('nickname')}
                required
            />

            <PasswordField
                className={classes.input}
                label={t('signup.field.password')}
                error={errorFor('password')}
                name="password"
                helperText={helperFor('password')}
                {...{
                    password: data.password,
                    setPassword: (p) => updateData({ password: p }),
                }}
                required
            />

            <PasswordField
                className={classes.input}
                name="repeatedPassword"
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
                name="description"
                value={data['description']}
                onChange={changeData('description')}
                error={errorFor('description')}
                helperText={helperFor('description')}
                multiline
                rows={5}
            />

            <div className={classes.bottom}>
                {deleteUser && (
                    <Button
                        className={classes.buttons}
                        disableElevation
                        onClick={deleteUser}
                        variant="contained"
                        color="secondary"
                        type="submit"
                        size="large"
                        disabled={uploading}
                        startIcon={<DeleteIcon />}
                    >
                        {t('product.delete')}
                    </Button>
                )}

                <Button
                    className={classes.buttons}
                    disableElevation
                    disabled={uploading}
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    id="signup-bt"
                >
                    {t('signup.continue')}
                </Button>
            </div>
        </form>
    )
}

export default SignupFormComponent
