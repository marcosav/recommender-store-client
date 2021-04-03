import React from 'react'

import { ProductReport } from '../../../../types'

import Delete from '@material-ui/icons/Delete'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'

import { DateUtils } from '../../../../utils'

import { Link } from 'react-router-dom'

interface ReportHolderProps {
    report: ProductReport
    deleteReport: any
}

const ReportHolder: React.FC<ReportHolderProps> = ({
    report,
    deleteReport,
}) => {
    const [removed, setRemoved] = React.useState(false)

    const date = DateUtils.format(report.date.seconds)

    const onDelete = () => {
        if (!removed) if (deleteReport()) setRemoved(true)
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {date}
            </TableCell>
            <TableCell align="right">
                <Link to={`/product/${report.productId}`}>
                    {report.productName}
                </Link>
            </TableCell>
            <TableCell align="right">{report.reason}</TableCell>
            <TableCell align="right">
                <Link to={`/vendor/${report.userId}`}>
                    {report.userNickname}
                </Link>
            </TableCell>
            <TableCell align="right">
                {!removed && (
                    <IconButton size="small" onClick={onDelete}>
                        <Delete />
                    </IconButton>
                )}
            </TableCell>
        </TableRow>
    )
}

export default ReportHolder
