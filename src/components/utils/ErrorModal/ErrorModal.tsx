import React from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import { useTranslation } from 'react-i18next'

interface ErrorModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: theme.palette.error.main,
        },
        light: {
            color: theme.palette.error.light,
        },
    })
)

const ErrorModal: React.FC<ErrorModalProps> = ({ open, setOpen }) => {
    const { t } = useTranslation()

    const handleClose = () => setOpen(false)

    const classes = useStyles()

    return (
        <Dialog
            className={classes.root}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle className={classes.root} id="alert-dialog-title">
                {t('error.server_response.title')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    className={classes.light}
                    id="alert-dialog-description"
                >
                    {t('error.server_response.text')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    className={classes.root}
                    onClick={handleClose}
                    color="primary"
                >
                    {t('error.server_response.close')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ErrorModal
