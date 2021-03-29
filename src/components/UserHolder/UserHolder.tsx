import React from 'react'

import { User } from '../../types'

import { useStyles } from './UserHolder.style'

import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import Favorite from '@material-ui/icons/Favorite'

import { useHistory } from 'react-router'
import { useTheme } from '@material-ui/core'
import { FavoriteService, ResourceService } from '../../api'
import { HttpStatusCode } from '../../utils'

interface ProductProps {
    Actions?: React.FC<UserActionsProps>
}

interface UserActionsProps {
    user: User
    favService?: FavoriteService
    resources?: ResourceService
}

const DefaultActions: React.FC<UserActionsProps> = ({ user, favService }) => {
    const theme = useTheme()

    const [favorite, setFavorite] = React.useState(true)

    const addToFav = async (e: any) => {
        e.stopPropagation()

        const r = await (favorite
            ? favService!!.remove(user.id, false)
            : favService!!.add(user.id, false))

        if (r.status !== HttpStatusCode.OK) return

        setFavorite(!favorite)
    }

    return (
        <>
            <IconButton size={'small'} onClick={addToFav}>
                {favorite ? (
                    <Favorite htmlColor={theme.palette.error.main} />
                ) : (
                    <FavoriteBorder />
                )}
            </IconButton>
        </>
    )
}

const UserHolder: React.FC<ProductProps & UserActionsProps> = ({
    user,
    Actions = DefaultActions,
    favService,
    resources,
}) => {
    const history = useHistory()

    const classes = useStyles()

    const [img, setImg] = React.useState<any>()

    const gotoProfile = () => history.push(`/vendor/${user.id}`, undefined)

    React.useEffect(() => {
        const loadImage = async () => {
            const r = await resources!!.load(user.profileImgUri!!)

            if (r.status !== HttpStatusCode.OK) return

            setImg(URL.createObjectURL(r.data))
        }

        if (user.profileImgUri) loadImage()
    }, [user, resources])

    return (
        <div className={classes.container}>
            <IconButton onClick={gotoProfile} className={classes.button}>
                <Avatar className={classes.avatar} src={img}>
                    {user?.nickname?.substring(0, 2)}
                </Avatar>
            </IconButton>
            <Paper className={classes.actions}>
                <Actions {...{ user, favService }} />
                <Typography className={classes.username} onClick={gotoProfile}>
                    {user.nickname}
                </Typography>
            </Paper>
        </div>
    )
}

export default UserHolder
