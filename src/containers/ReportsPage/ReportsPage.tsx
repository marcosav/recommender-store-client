import React from 'react'

import { RouteComponentProps } from 'react-router'

import { useProductReportService, useProductService } from '../../services'

import { useTranslation } from 'react-i18next'

import { useStyles } from './ReportsPage.style'
import { Product, ProductReport } from '../../types'
import { ContentWarn, PageContainer } from '../../components'

import Typography from '@material-ui/core/Typography'
import NotesIcon from '@material-ui/icons/Notes'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'

import { HttpStatusCode } from '../../utils'
import ReportHolder from './components'

interface ReportsParams {
    id?: string
}

const ReportsPage: React.FC<RouteComponentProps<ReportsParams>> = ({
    match,
    history,
}) => {
    const { t } = useTranslation()

    const { id } = match.params

    const _id = parseInt(id ?? '')
    const productId = isNaN(_id) ? undefined : _id

    const reportService = useProductReportService()
    const productService = useProductService()

    const [product, setProduct] = React.useState<Product>()

    const classes = useStyles()

    React.useEffect(() => {
        const fetchProduct = async () => {
            const r = await productService.getProduct(productId!!)

            switch (r.status) {
                case HttpStatusCode.OK:
                    setProduct(r.data)
                    break
                case HttpStatusCode.NotFound:
                    history.push('/404')
            }
        }

        if (productId) fetchProduct()
    }, [history, productId, productService])

    const deleteReport = (id: number) => async () => {
        const r = await reportService.remove(id)
        return r.status === HttpStatusCode.OK
    }

    const NoReports = () => (
        <ContentWarn>
            <NotesIcon />
            <Typography>{t('reports.empty')}</Typography>
        </ContentWarn>
    )

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <Typography variant="h4" component="h1">
                    {t('reports.title')}
                </Typography>
                {productId && product && (
                    <Typography
                        variant="h6"
                        component="h2"
                        color="textSecondary"
                    >
                        {product.name}
                    </Typography>
                )}
            </header>
            <PageContainer
                request={(page) => reportService.getFor({ page, productId })}
                itemRender={(r: ProductReport, i) => (
                    <ReportHolder
                        key={i}
                        report={r}
                        deleteReport={deleteReport(r.id)}
                    />
                )}
                EmptyComponent={NoReports}
                ContainerComponent={({ children }) => (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('reports.date')}</TableCell>
                                    <TableCell align="right">
                                        {t('reports.product')}
                                    </TableCell>
                                    <TableCell align="right">
                                        {t('reports.reason')}
                                    </TableCell>
                                    <TableCell align="right">
                                        {t('signup.field.nickname')}
                                    </TableCell>
                                    <TableCell align="right"> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{children}</TableBody>
                        </Table>
                    </TableContainer>
                )}
                {...{
                    setShownItems: () => undefined,
                    deps: [],
                }}
            />
        </div>
    )
}

export default ReportsPage
