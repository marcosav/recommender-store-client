import React from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

import { useTranslation } from 'react-i18next'
import { HttpStatusCode } from '../../../utils'

interface ErrorAlertProps {
    error: number | undefined
    setOpen: (open: boolean) => void
    open: boolean
}

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const knownErrors: (number | undefined)[] = [
    HttpStatusCode.Unauthorized,
    HttpStatusCode.ServerError,
]

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, open, setOpen }) => {
    const { t } = useTranslation()

    const handleClose = (e?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') return

        setOpen(false)
    }

    const msg = knownErrors.includes(error)
        ? t(`error.${error}.text`)
        : t(`error.other.text`)

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="error">{msg}</Alert>
        </Snackbar>
    )
}

export default ErrorAlert
