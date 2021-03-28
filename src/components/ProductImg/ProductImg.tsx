import React from 'react'

import { ResourceService } from '../../api'
import { Constants, HttpStatusCode } from '../../utils'

const ProductImg: React.FC<
    any & {
        fallback?: string
        url?: string
        resources?: ResourceService
        setSelectedImg?: any
        selectedImgUrl?: string
    }
> = ({
    fallback = Constants.FALLBACK_IMAGE,
    src,
    alt,
    url,
    resources,
    selectedImgUrl,
    setSelectedImg,
    ...rest
}) => {
    const [img, setImg] = React.useState<any>()

    React.useEffect(() => {
        const load = async () => {
            const r = await resources.load(url)

            if (r.status !== HttpStatusCode.OK) return

            setImg(URL.createObjectURL(r.data))
        }

        if (resources && url) load()
    }, [resources, url])
    
    React.useEffect(() => {
        if (selectedImgUrl && resources && selectedImgUrl === url) setSelectedImg(img)
    }, [resources, selectedImgUrl, url, setSelectedImg, img])

    return (
        <picture>
            <source srcSet={src ?? img} />
            <source srcSet={fallback} />
            <img alt={alt} {...rest} />
        </picture>
    )
}

export default ProductImg
