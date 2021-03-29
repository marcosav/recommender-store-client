import React from 'react'

import {
    useFavoriteService,
    useResourceService,
    useSessionService,
} from '../../../../services'

import { useStyles } from './VendorProfileInfo.style'
import { HttpStatusCode } from '../../../../utils'

import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'
import EditOutlined from '@material-ui/icons/EditOutlined'
import Paper from '@material-ui/core/Paper'

import { useTheme } from '@material-ui/core'
import { User } from '../../../../types'

import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'

interface VendorProfileInfoParams {
    user: User
    self: boolean
}

const VendorProfileInfo: React.FC<VendorProfileInfoParams> = ({
    user,
    self,
}) => {
    const history = useHistory()

    const favService = useFavoriteService()
    const resources = useResourceService()
    const sessionService = useSessionService()

    const classes = useStyles()
    const theme = useTheme()

    const { t } = useTranslation()

    const editable = self || sessionService.current()?.admin

    const [profileImage, setProfileImage] = React.useState<string>()

    const [favorite, setFavorite] = React.useState<boolean>()

    const edit = () => {
        if (editable) history.push(`/profile/edit/${user.id}`)
    }

    const addToFav = async (e: any) => {
        e.stopPropagation()

        if (!user) return

        const r = await (favorite
            ? favService.remove(user.id, false)
            : favService.add(user.id, false))

        if (r.status !== HttpStatusCode.OK) return

        setFavorite(!favorite)
    }

    React.useEffect(() => {
        const loadImage = async () => {
            const r = await resources.load(user?.profileImgUri!!)
            if (r.status !== HttpStatusCode.OK) return

            setProfileImage(URL.createObjectURL(r.data))
        }

        if (user?.profileImgUri) loadImage()
    }, [user, resources])

    React.useEffect(() => {
        if (user) setFavorite(user.fav === true)
    }, [user])

    return (
        <div className={classes.top}>
            <Paper elevation={0} className={classes.buttons}>
                {!self && (
                    <IconButton size="small" onClick={addToFav}>
                        {favorite ? (
                            <Favorite htmlColor={theme.palette.error.main} />
                        ) : (
                            <FavoriteBorder />
                        )}
                    </IconButton>
                )}
                {editable && (
                    <IconButton size="small" onClick={edit}>
                        <EditOutlined />
                    </IconButton>
                )}
            </Paper>

            <Avatar className={classes.avatar} src={profileImage}>
                {user?.nickname?.substring(0, 2)}
            </Avatar>
            <div className={classes.topText}>
                <Typography variant="h3" component="h1">
                    {user?.nickname}
                </Typography>
                <Typography variant="body2">{user?.description}</Typography>
            </div>

            <Typography
                variant="h4"
                component="h2"
                className={classes.title}
                color="textSecondary"
            >
                {t('profile.product_title')}
            </Typography>
        </div>
    )
}

export default VendorProfileInfo
