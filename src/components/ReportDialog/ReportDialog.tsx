import React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { useTranslation } from 'react-i18next'

interface ReportDialogProps {
    open: boolean
    setOpen: (open: boolean) => void
}

const ReportDialog: React.FC<ReportDialogProps> = ({ open, setOpen }) => {
    const { t } = useTranslation()

    const handleClose = () => setOpen(false)

    const handleReport = () => {
        
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                {t('product.report.title')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('product.report.body')}
                </DialogContentText>
                <TextField
                    autoFocus
                    variant="outlined"
                    margin="dense"
                    id="name"
                    label={t('product.report.placeholder')}
                    fullWidth
                    multiline
                    rows={3}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('cancel')}
                </Button>
                <Button onClick={handleClose} color="primary">
                    {t('product.report.button')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ReportDialog
