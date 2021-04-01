import React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { useTranslation } from 'react-i18next'
import { useProductReportService } from '../../services'
import { Product } from '../../types'
import { HttpStatusCode, ValidationTools } from '../../utils'

interface ReportDialogProps {
    product: Product
    open: boolean
    setOpen: (open: boolean) => void
}

const ReportDialog: React.FC<ReportDialogProps> = ({
    product,
    open,
    setOpen,
}) => {
    const { t } = useTranslation()

    const reportService = useProductReportService()

    const [reason, setReason] = React.useState('')
    const [errors, setErrors] = React.useState<any>({})

    const handleClose = () => {
        setReason('')
        setErrors({})
        setOpen(false)
    }

    const handleReport = async () => {
        const r = await reportService.report(product.id, reason)
        switch (r.status) {
            case HttpStatusCode.OK:
            case HttpStatusCode.NoContent:
            case HttpStatusCode.NotFound:
                break
            case HttpStatusCode.BadRequest:
                setErrors((r.data as any).error)
                return
        }

        handleClose()
    }

    const { errorFor, helperFor } = ValidationTools.createValidator(t, errors)

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
                    onChange={(e) => setReason(e.target.value)}
                    value={reason}
                    error={errorFor('reason')}
                    helperText={helperFor('reason')}
                    rows={3}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t('cancel')}
                </Button>
                <Button onClick={handleReport} color="primary">
                    {t('product.report.button')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ReportDialog
