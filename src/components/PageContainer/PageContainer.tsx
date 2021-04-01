import React from 'react'

import { HttpStatusCode } from '../../utils'

import Pagination from '@material-ui/lab/Pagination'
import { Paged } from '../../api/types'
import { RPromise } from '../../api/BaseAPI'

import { ContentWarn, Loading } from '..'

import SearchIcon from '@material-ui/icons/Search'
import Typography from '@material-ui/core/Typography'

import { useTranslation } from 'react-i18next'

import { useHistory, useLocation } from 'react-router'
import { useStyles } from './PageContainer.style'

interface PageContainerProps<T> {
    request: (page: number) => RPromise<Paged<T>>
    itemRender: (item: T, index: number) => React.ReactNode
    EmptyComponent?: React.FC
    setShownItems: (loaded?: Paged<T>) => void
    deps?: any[]
    ContainerComponent?: React.FC
}

const NoResults = () => {
    const { t } = useTranslation()
    return (
        <ContentWarn>
            <SearchIcon />
            <Typography>{t('search.no_results')}</Typography>
        </ContentWarn>
    )
}

function PageContainer<T>({
    request,
    itemRender,
    EmptyComponent,
    setShownItems,
    deps = [],
    ContainerComponent,
}: PageContainerProps<T>) {
    const location = useLocation()
    const history = useHistory()

    const page = (location as any)?.state?.page ?? 1

    const [items, setItems] = React.useState<T[]>()
    const [pages, setPages] = React.useState(0)

    const classes = useStyles()

    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        history.push(
            location.pathname,
            !location.state ? { page } : { ...(location.state as any), page }
        )
    }

    React.useEffect(() => {
        const fetchRequest = async () => {
            setItems(undefined)
            setShownItems(undefined)

            const r = await request(page - 1)

            if (r.status !== HttpStatusCode.OK) return

            handleData(r.data)
        }

        const handleData = (data: Paged<T>) => {
            setItems(data.items)
            setShownItems(data)
            const pageCount = Math.ceil(data.total / data.pageSize)
            setPages(pageCount)
        }

        fetchRequest()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setShownItems, page, ...deps])

    const Empty = EmptyComponent ? <EmptyComponent /> : <NoResults />
    const Container: React.FC = ({ children }) =>
        ContainerComponent ? (
            <ContainerComponent>{children}</ContainerComponent>
        ) : (
            <div className={classes.container}>{children}</div>
        )

    return items === undefined ? (
        <Loading />
    ) : items.length ? (
        <div className={classes.root}>
            <Container>
                {items.map((p, i: number) => itemRender(p, i))}
            </Container>
            {pages > 1 && (
                <Pagination
                    className={classes.pagger}
                    count={pages}
                    page={page}
                    onChange={handlePageChange}
                    hideNextButton
                    hidePrevButton
                    showFirstButton
                    showLastButton
                />
            )}
        </div>
    ) : (
        Empty
    )
}

export default PageContainer
