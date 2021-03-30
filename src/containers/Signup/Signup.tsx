import React from 'react'

import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { RouteComponentProps } from 'react-router'

import {
    useResourceService,
    useSessionService,
    useUserService,
} from '../../services'
import { HttpStatusCode } from '../../utils'

import { SignupForm } from '../../api/UserAPI'

import { useStyles } from './Signup.style'

import { useTranslation } from 'react-i18next'

import { EditTitle, SignupFormComponent } from './components'
import { CircularProgressIndicator } from '../../components'

import Backdrop from '@material-ui/core/Backdrop'

import { SignupTitle } from './components'

interface UserEditParams {
    id?: string
}

const Signup: React.FC<RouteComponentProps<UserEditParams>> = ({
    history,
    match,
}) => {
    const userService = useUserService()
    const sessionService = useSessionService()
    const resources = useResourceService()

    const { t } = useTranslation()

    const { id } = match.params
    const edit = match.path.includes('edit')

    const session = sessionService.current()

    const classes = useStyles()

    const [data, setData] = React.useState<SignupForm | undefined>(
        edit
            ? undefined
            : {
                  name: '',
                  surname: '',
                  email: '',
                  repeatedEmail: '',
                  password: '',
                  repeatedPassword: '',
                  nickname: '',
                  description: '',
              }
    )

    const [imagePreview, setImagePreview] = React.useState<any>()
    const [image, setImage] = React.useState<any>()

    const [editImageUri, setEditImageUri] = React.useState<any>()

    const [errors, setErrors] = React.useState<any>({})

    const [uploadProgress, setUploadProgress] = React.useState<any>()

    const uploading = uploadProgress !== undefined

    const onUploadProgress = (e: any) => {
        const p = (e.loaded / e.total) * 100
        setUploadProgress(p === 100 ? undefined : p)
    }

    const removePhoto = () => {
        setImagePreview(undefined)
        setImage(undefined)

        if (!edit || !data) return
        setData({ ...data!!, deletePhoto: true })
    }

    const deletable = () =>
        edit && session?.admin && session?.userId !== parseInt(id!!)

    const deleteUser = async (e: any) => {
        e.preventDefault()

        if (uploading) return
        if (!deletable()) return
        const r = await userService.deleteUser(data?.id!!)

        switch (r.status) {
            case HttpStatusCode.OK:
                history.push('/')
                break
            case HttpStatusCode.Forbidden:
            case HttpStatusCode.NotFound:
                history.goBack()
        }
    }

    const doSignup = async () => {
        const r = await userService.signup(data!!, image, onUploadProgress)

        switch (r.status) {
            case HttpStatusCode.OK:
                break
            case HttpStatusCode.NoContent:
                history.push('/')
                return
            case HttpStatusCode.BadRequest:
                setErrors((r.data as any).error)
                return
        }

        const rLogin = await userService.login({
            username: data!!.nickname,
            password: data!!.password,
        })

        switch (rLogin.status) {
            case HttpStatusCode.OK:
            case HttpStatusCode.NoContent:
                history.push('/')
                break
        }
    }

    const doEdit = async () => {
        const r = await userService.edit(data!!, image, onUploadProgress)

        if (r.status !== HttpStatusCode.OK) setErrors((r.data as any).error)
        else history.goBack()
    }

    const doForm = (e: any) => {
        e.preventDefault()

        if (uploading || !data) return

        if (edit) doEdit()
        else doSignup()
    }

    const selectPhoto = (e: any) => {
        const file = e.target.files[0]
        const image = URL.createObjectURL(file)
        setImagePreview(image)
        setImage(file)
        setData({ ...data!!, deletePhoto: false })
    }

    React.useEffect(() => {
        const handleNotFound = () => history.push('/404')
        const handleNotPermission = () => history.goBack()

        const fetchUser = async (userId: number) => {
            const session = sessionService.current()
            if (userId !== session?.userId && !session?.admin) {
                handleNotPermission()
                return
            }

            const r = await userService.getDetailedUser(userId)

            switch (r.status) {
                case HttpStatusCode.OK:
                    const u = r.data
                    setData({
                        id: u.id,
                        name: u.name,
                        surname: u.surname,
                        email: u.email,
                        password: '',
                        repeatedPassword: '',
                        nickname: u.nickname,
                        description: u.description,
                    })

                    setEditImageUri(u.profileImgUri)
                    break
                case HttpStatusCode.NotFound:
                    handleNotFound()
            }
        }

        if (edit) {
            let userId = parseInt(id!!)
            fetchUser(userId)
        }
    }, [edit, userService, id, history, sessionService])

    React.useEffect(() => {
        const loadImage = async () => {
            const r = await resources.load(editImageUri)

            if (r.status !== HttpStatusCode.OK) return

            setImagePreview(URL.createObjectURL(r.data))
        }

        if (editImageUri) loadImage()
    }, [editImageUri, resources])

    return (
        <>
            {edit ? <EditTitle /> : <SignupTitle />}

            <div className={classes.container}>
                <div className={classes.upload}>
                    {imagePreview && (
                        <IconButton
                            component="span"
                            onClick={removePhoto}
                            className={classes.deleteImage}
                        >
                            <DeleteIcon color="error" />
                        </IconButton>
                    )}
                    <input
                        accept=".jpg,.jpeg,.png"
                        id="profile-img-upload"
                        type="file"
                        onChange={selectPhoto}
                    />
                    <label htmlFor="profile-img-upload">
                        <IconButton component="span">
                            <Avatar
                                className={classes.avatar}
                                src={imagePreview}
                            />
                        </IconButton>
                    </label>
                    <Typography
                        variant="caption"
                        color={'image' in errors ? 'error' : 'textSecondary'}
                    >
                        {t('signup.field.photo_footer')}
                    </Typography>
                </div>

                {data && (
                    <SignupFormComponent
                        {...{
                            doForm,
                            data,
                            errors,
                            setData,
                            uploading,
                            edit,
                            deleteUser: deletable() ? deleteUser : undefined,
                        }}
                    />
                )}
            </div>

            <Backdrop className={classes.backdrop} open={uploading}>
                <CircularProgressIndicator value={uploadProgress} size={52} />
            </Backdrop>
        </>
    )
}

export default Signup
