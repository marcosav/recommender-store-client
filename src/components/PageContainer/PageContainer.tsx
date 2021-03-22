import React from 'react'

import { HttpStatusCode } from '../../utils'

import Pagination from '@material-ui/lab/Pagination'
import { Paged } from '../../api/types'
import { RPromise } from '../../api/BaseAPI'

import { ContentWarn, Loading } from '..'

import SearchIcon from '@material-ui/icons/Search'
import Typography from '@material-ui/core/Typography'

import { useTranslation } from 'react-i18next'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useHistory, useLocation } from 'react-router'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        container: {
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 300px)',
            [theme.breakpoints.up(490)]: {
                gridTemplateColumns: 'repeat(2, 1fr)',
            },
            [theme.breakpoints.up(730)]: {
                gridTemplateColumns: 'repeat(3, 1fr)',
            },
            [theme.breakpoints.up('md')]: {
                gridTemplateColumns: 'repeat(4, 1fr)',
            },
            [theme.breakpoints.up('lg')]: {
                gridTemplateColumns: 'repeat(5, 1fr)',
            },
            [theme.breakpoints.up(1600)]: {
                gridTemplateColumns: 'repeat(6, 1fr)',
            },
            margin: theme.spacing(0, 0, 1, 2),
        },
        pagger: {
            margin: theme.spacing(2),
        },
    })
)

interface PageContainerProps<T> {
    request: (page: number) => RPromise<Paged<T>>
    itemRender: (item: T, index: number) => React.ReactNode
    EmptyComponent?: React.FC
    setShownItems?: (loaded?: T[]) => void
    deps: any[]
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
    setShownItems = () => undefined,
    deps,
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
            setShownItems(data.items)
            const pageCount = Math.ceil(data.total / data.pageSize)
            setPages(pageCount)
        }

       fetchRequest()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setShownItems, page, ...deps])

    const Empty = EmptyComponent ? <EmptyComponent /> : <NoResults />

    return items === undefined ? (
        <Loading />
    ) : items.length ? (
        <div className={classes.root}>
            <div className={classes.container}>
                {items.map((p, i: number) => itemRender(p, i))}
            </div>
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
