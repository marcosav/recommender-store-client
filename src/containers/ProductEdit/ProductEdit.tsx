import React from 'react'

import { useTranslation } from 'react-i18next'
import {
    useProductService,
    useResourceService,
    useSessionService,
} from '../../services'
import { Constants, HttpStatusCode } from '../../utils'

import { ProductForm } from '../../api/ProductAPI'

import { useStyles } from './ProductEdit.style'
import { RouteComponentProps } from 'react-router'
import {
    CircularProgressIndicator,
    Loading,
    ProductImg,
} from '../../components'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Backdrop from '@material-ui/core/Backdrop'
import DeleteIcon from '@material-ui/icons/Delete'

import { ProductEditForm } from './components'
import { ProductCategory } from '../../types'

interface ProductEditProps {
    id?: string
}

const ProductEdit: React.FC<RouteComponentProps<ProductEditProps>> = ({
    match,
    history,
}) => {
    const { id } = match.params

    const { t } = useTranslation()

    const productService = useProductService()
    const sessionService = useSessionService()
    const resources = useResourceService()

    const classes = useStyles()

    const edit = id !== undefined

    const [categories, setCategories] = React.useState<ProductCategory[]>()
    const [data, setData] = React.useState<ProductForm | undefined>(
        edit
            ? undefined
            : {
                  id: undefined,
                  name: '',
                  description: '',
                  price: 0,
                  stock: 1,
                  category: 0,
                  hidden: false,
              }
    )

    const [errors, setErrors] = React.useState<any>({})

    const [uploadProgress, setUploadProgress] = React.useState<any>()

    const uploading = uploadProgress !== undefined

    const onUploadProgress = (e: any) => {
        const p = (e.loaded / e.total) * 100
        setUploadProgress(p === 100 ? undefined : p)
    }

    const [imagePreviews, setImagePreviews] = React.useState<any[]>(
        new Array(Constants.MAX_PRODUCT_IMAGES)
    )
    const [files, setFiles] = React.useState<any[]>(
        new Array(Constants.MAX_PRODUCT_IMAGES)
    )
    const [images, setImages] = React.useState<any[]>([])

    const goBack = () => history.goBack()

    const updateProduct = async (e: any) => {
        e.preventDefault()

        if (uploading) return
        if (!data) return

        const r = await productService.publishProduct(
            data,
            files,
            onUploadProgress,
            edit
        )

        switch (r.status) {
            case HttpStatusCode.OK:
            case HttpStatusCode.Forbidden:
                history.push(`/product/${r.data}`)
                break
            case HttpStatusCode.BadRequest:
                setErrors((r.data as any).error)
        }
    }

    const deleteProduct = async (e: any) => {
        e.preventDefault()

        if (uploading) return
        if (!edit) return
        const r = await productService.deleteProduct(data?.id!!)

        switch (r.status) {
            case HttpStatusCode.OK:
                history.push('/')
                break
            case HttpStatusCode.Forbidden:
                goBack()
        }
    }

    const removePhoto = (i: number) => {
        setImagePreviews((current) => {
            current[i] = undefined
            return [...current]
        })
        setFiles((current) => {
            current[i] = null
            return [...current]
        })
        setImages((current) => {
            const index = current.findIndex((im) => im?.i === i)
            current[index] = undefined
            return [...current]
        })
    }

    const selectPhoto = (i: number, e: any) => {
        const file = e.target.files[0]
        const image = URL.createObjectURL(file)
        setImagePreviews((current) => {
            current[i] = image
            return [...current]
        })
        setFiles((current) => {
            current[i] = file
            return [...current]
        })
    }

    React.useEffect(() => {
        const handleNotFound = () => history.push('/404')
        const handleNotPermission = () => history.goBack()

        const fetchProduct = async (productId: number) => {
            const r = await productService.getProduct(productId)
            const session = sessionService.current()

            switch (r.status) {
                case HttpStatusCode.OK:
                    const p = r.data
                    if (p.userId !== session?.userId && !session?.admin) {
                        handleNotPermission()
                        return
                    }

                    setData({
                        id: p.id,
                        name: p.name,
                        description: p.description,
                        price: p.price,
                        stock: p.stock,
                        category: p.category.id,
                        hidden: p.hidden,
                    })

                    setImages(p.images)
                    break
                case HttpStatusCode.NotFound:
                    handleNotFound()
            }
        }

        if (edit) {
            let productId = parseInt(id!!)
            fetchProduct(productId)
        }
    }, [edit, productService, id, history, sessionService])

    React.useEffect(() => {
        const fetchCategories = async () => {
            const r = await productService.findCategories()

            if (r.status === HttpStatusCode.OK) setCategories(r.data)
        }

        if (!categories) fetchCategories()
    }, [productService, categories])

    return (
        <>
            {categories === undefined || data === undefined ? (
                <Loading />
            ) : (
                <div className={classes.root}>
                    <header className={classes.header}>
                        <IconButton onClick={() => goBack()}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography
                            className={classes.title}
                            variant="h4"
                            component="h1"
                        >
                            {edit ? t('product.edit') : t('product.publish')}
                        </Typography>
                    </header>
                    <div className={classes.images}>
                        {Array.from(
                            { length: Constants.MAX_PRODUCT_IMAGES },
                            (_, i) => i
                        ).map((i) => {
                            const url = images.find((im) => im?.i === i)?.u
                            return (
                                <Paper key={i} className={classes.holder}>
                                    {(url || files[i]) && (
                                        <IconButton
                                            size="small"
                                            component="span"
                                            onClick={() => removePhoto(i)}
                                            className={classes.deleteImage}
                                        >
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    )}
                                    <input
                                        accept=".jpg,.jpeg,.png"
                                        id={`product-img-upload-${i}`}
                                        type="file"
                                        onChange={(e) => selectPhoto(i, e)}
                                    />
                                    <label htmlFor={`product-img-upload-${i}`}>
                                        <IconButton component="span">
                                            <ProductImg
                                                className={classes.imagePreview}
                                                src={imagePreviews[i]}
                                                url={url ?? undefined}
                                                resources={resources}
                                                alt={`I${i}`}
                                            />
                                        </IconButton>
                                    </label>
                                </Paper>
                            )
                        })}
                    </div>
                    <ProductEditForm
                        {...{
                            updateProduct,
                            deleteProduct,
                            errors,
                            data,
                            setData,
                            categories,
                            uploading,
                        }}
                    />
                </div>
            )}
            <Backdrop className={classes.backdrop} open={uploading}>
                <CircularProgressIndicator value={uploadProgress} size={52} />
            </Backdrop>
        </>
    )
}

export default ProductEdit
