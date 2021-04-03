import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { useTranslation } from 'react-i18next'

interface InvalidCartDialogProps {
    content: string | undefined
    setContent: (open: string | undefined) => void
}

const InvalidCartDialog: React.FC<InvalidCartDialogProps> = ({
    content,
    setContent,
}) => {
    const { t } = useTranslation()

    const handleClose = () => setContent(undefined)

    return (
        <Dialog
            open={content !== undefined}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {t('cart.invalid.title')}
            </DialogTitle>
            <DialogContent>
                {content && (
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    {t('cart.invalid.button')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default InvalidCartDialog
