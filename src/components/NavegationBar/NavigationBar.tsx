import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'

import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import Favorite from '@material-ui/icons/Favorite'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Add from '@material-ui/icons/Add'
import Person from '@material-ui/icons/Person'
import SignUp from '@material-ui/icons/HowToReg'
import ArrowForward from '@material-ui/icons/ArrowForward'
import GavelIcon from '@material-ui/icons/Gavel'
import ReportIcon from '@material-ui/icons/Report'
import HistoryIcon from '@material-ui/icons/History'
import HomeIcon from '@material-ui/icons/Home'

import { useStyles } from './NavigationBar.style'
import { useHistory } from 'react-router'

import { useSessionService } from '../../services'
import { useTranslation } from 'react-i18next'

import LogoIcon from './Logo'

const NavigationBar = () => {
    const sessionService = useSessionService()
    const session = sessionService.current()

    const classes = useStyles()
    const history = useHistory()
    const { t } = useTranslation()

    const cartItems = session?.cart?.length
    const username = session?.username
    const logged = username !== undefined

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [anchorAdmin, setAnchorAdmin] =
        React.useState<null | HTMLElement>(null)
    const [searched, setSearched] = React.useState('')

    const handleMenuClose = () => setAnchorEl(null)

    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const handleAdminMenuClose = () => setAnchorAdmin(null)

    const handleAdminMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorAdmin(e.currentTarget)
    }

    const redirect = (path: string) => {
        handleMenuClose()
        handleAdminMenuClose()
        history.push(path, undefined)
    }

    const onSearch = (e: any) => {
        e.preventDefault()
        if (searched.trim()) redirect(`/search/${searched}`)
    }

    const menuId = 'nav-account-menu'
    const adminMenuId = 'nav-admin-menu'

    const menuContent = (
        <div>
            <Typography color={'textSecondary'} className={classes.menuText}>
                {t('nav.login_info')}
            </Typography>
            <MenuItem id="login-nav-bt" onClick={() => redirect('/login')}>
                <ListItemIcon color="inherit">
                    <Person />
                </ListItemIcon>
                {t('nav.login')}
            </MenuItem>

            <Typography color={'textSecondary'} className={classes.menuText}>
                {t('nav.signup_info')}
            </Typography>
            <MenuItem id="signup-nav-bt" onClick={() => redirect('/signup')}>
                <ListItemIcon color="inherit">
                    <SignUp />
                </ListItemIcon>
                {t('nav.signup')}
            </MenuItem>
        </div>
    )

    const menuContentLogged = (
        <div>
            <MenuItem id="profile-nav-bt" onClick={() => redirect('/profile')}>
                <ListItemIcon aria-controls={menuId} color="inherit">
                    <AccountCircle fontSize="large" />
                </ListItemIcon>
                <Typography className={classes.usernameMenu}>
                    {username}
                </Typography>
            </MenuItem>

            <Divider className={classes.divider} color={'transparent'} />

            <MenuItem id="fav-nav-bt" onClick={() => redirect('/favorites')}>
                <ListItemIcon color="inherit">
                    <Favorite />
                </ListItemIcon>
                {t('nav.favorites')}
            </MenuItem>

            <MenuItem id="history-nav-bt" onClick={() => redirect('/history')}>
                <ListItemIcon color="inherit">
                    <HistoryIcon />
                </ListItemIcon>
                {t('nav.history')}
            </MenuItem>

            <MenuItem
                id="upload-nav-bt"
                onClick={() => redirect('/product/publish')}
                className={classes.add}
            >
                <ListItemIcon color="inherit">
                    <Add className={classes.add} />
                </ListItemIcon>
                {t('nav.upload')}
            </MenuItem>

            <Divider className={classes.divider} light />

            <MenuItem id="logout-nav-bt" onClick={() => redirect('/logout')}>
                <ListItemIcon color="inherit">
                    <ExitToApp />
                </ListItemIcon>
                {t('nav.logout')}
            </MenuItem>
        </div>
    )

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
        >
            {logged ? menuContentLogged : menuContent}
        </Menu>
    )

    const adminMenu = (
        <Menu
            anchorEl={anchorAdmin}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={adminMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorAdmin)}
            onClose={handleAdminMenuClose}
        >
            <MenuItem onClick={() => redirect('/reports')}>
                <ListItemIcon color="inherit">
                    <ReportIcon />
                </ListItemIcon>
                {t('nav.admin.reports')}
            </MenuItem>
        </Menu>
    )

    return (
        <div>
            <AppBar position="static">
                <Toolbar variant={'dense'} className={classes.toolbar}>
                    <LogoIcon
                        fontSize="large"
                        className={classes.logo}
                        onClick={() => redirect('/')}
                    />

                    <IconButton
                        color="inherit"
                        className={classes.home}
                        onClick={() => redirect('/')}
                    >
                        <HomeIcon />
                    </IconButton>

                    <div className={classes.searchContainer}>
                        <Paper
                            component="form"
                            onSubmit={onSearch}
                            className={classes.search}
                        >
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                id="search-input"
                                placeholder={t('nav.search')}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={searched}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setSearched(e.target.value)}
                            />
                            <IconButton
                                type="submit"
                                className={classes.inputButton}
                                aria-label="search"
                            >
                                <ArrowForward />
                            </IconButton>
                        </Paper>
                    </div>

                    <div />

                    {session?.admin && (
                        <IconButton
                            onClick={handleAdminMenuOpen}
                            color="inherit"
                        >
                            <GavelIcon />
                        </IconButton>
                    )}

                    <IconButton
                        id="cart-nav-bt"
                        onClick={() => redirect('/cart')}
                        color="inherit"
                    >
                        <Badge badgeContent={cartItems} color="secondary">
                            <ShoppingBasket />
                        </Badge>
                    </IconButton>

                    <IconButton
                        edge="end"
                        id="user-nav"
                        onClick={handleMenuOpen}
                        color="inherit"
                    >
                        {logged ? (
                            <Avatar className={classes.avatar}>
                                {username?.substring(0, 2)}
                            </Avatar>
                        ) : (
                            <AccountCircle fontSize="large" />
                        )}
                    </IconButton>
                </Toolbar>
            </AppBar>
            {renderMenu}
            {adminMenu}
        </div>
    )
}

export default NavigationBar
