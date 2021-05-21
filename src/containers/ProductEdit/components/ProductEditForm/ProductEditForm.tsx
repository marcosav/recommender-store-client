import React from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'

import { useTranslation } from 'react-i18next'

import { ProductForm } from '../../../../api/ProductAPI'

import { useStyles } from './ProductEditForm.style'
import { ProductCategory } from '../../../../types'

import clsx from 'clsx'
import { ValidationTools } from '../../../../utils'

interface ProductEditFormProps {
    updateProduct: (e: any) => void
    deleteProduct: (e: any) => void
    data: ProductForm
    setData: (data: any) => void
    errors: any
    categories: ProductCategory[]
    uploading: boolean
}

const ProductEditForm: React.FC<ProductEditFormProps> = ({
    updateProduct,
    deleteProduct,
    data,
    setData,
    errors,
    categories,
    uploading,
}) => {
    const { t } = useTranslation()

    const classes = useStyles()

    const [category, setCategory] = React.useState<ProductCategory>(
        categories.find((c) => c.id === data.category) ?? categories[0]
    )

    const edit = data.id !== undefined

    const updateData = (actual: {}) => {
        setData({ ...data, ...actual })
    }

    const changeData = (field: string) => (e: any) =>
        updateData({ [field]: e.target.value })

    const { errorFor, helperFor } = ValidationTools.createValidator(t, errors)

    React.useEffect(() => {
        if (category !== undefined) updateData({ category: category.id })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories])

    return (
        <form
            id="product-form"
            className={classes.form}
            onSubmitCapture={updateProduct}
            noValidate
            autoComplete="off"
        >
            <TextField
                className={classes.input}
                name="name"
                label={t('product.name')}
                variant="outlined"
                value={data['name']}
                onChange={changeData('name')}
                error={errorFor('name')}
                helperText={helperFor('name')}
                required
            />

            <TextField
                className={classes.input}
                name="brand"
                label={t('product.brand')}
                variant="outlined"
                value={data['brand']}
                onChange={changeData('brand')}
                error={errorFor('brand')}
                helperText={helperFor('brand')}
                required
            />

            <div className={classes.pair}>
                <TextField
                    className={classes.input}
                    name="price"
                    label={t('product.price')}
                    variant="outlined"
                    value={data['price']}
                    onChange={changeData('price')}
                    error={errorFor('price')}
                    helperText={helperFor('price')}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">€</InputAdornment>
                        ),
                    }}
                    required
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={data['hidden']}
                            onChange={(e) =>
                                updateData({ hidden: e.target.checked })
                            }
                            name="hidden"
                            color="primary"
                        />
                    }
                    label={t('product.hidden')}
                />
            </div>

            <div className={classes.pair}>
                <Autocomplete
                    className={classes.input}
                    options={categories}
                    getOptionLabel={(c) => t(`category.${c.name!!}`)}
                    value={category}
                    onChange={(e, v) => {
                        setCategory(v)
                        updateData({ category: v.id })
                    }}
                    disableClearable
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name="category"
                            label={t('product.category')}
                            variant="outlined"
                            error={errorFor('category')}
                            helperText={helperFor('category')}
                        />
                    )}
                />

                <TextField
                    className={clsx(classes.input, classes.stock)}
                    name="stock"
                    label={t('product.stock')}
                    variant="outlined"
                    type="number"
                    value={data['stock']}
                    onChange={changeData('stock')}
                    error={errorFor('stock')}
                    helperText={helperFor('stock')}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
            </div>

            <TextField
                className={classes.input}
                name="description"
                label={t('product.description')}
                variant="outlined"
                value={data['description']}
                onChange={changeData('description')}
                error={errorFor('description')}
                helperText={helperFor('description')}
                multiline
                rows={17}
            />

            <div className={classes.bottom}>
                {edit && (
                    <Button
                        className={classes.buttons}
                        disableElevation
                        id="delete-bt"
                        onClick={deleteProduct}
                        variant="contained"
                        color="secondary"
                        type="submit"
                        size="large"
                        disabled={uploading}
                        startIcon={<DeleteIcon />}
                    >
                        {t('product.delete')}
                    </Button>
                )}

                <Button
                    className={classes.buttons}
                    id="publish-bt"
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    disabled={uploading}
                    startIcon={<SaveIcon />}
                >
                    {t('product.save')}
                </Button>
            </div>
        </form>
    )
}

export default ProductEditForm
