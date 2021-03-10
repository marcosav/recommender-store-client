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

import { useStyles } from './NavigationBar.style'
import { useHistory } from 'react-router'

const NavigationBar = () => {
    const classes = useStyles()
    const history = useHistory()

    const [logged, setLogged] = React.useState(true)
    const [cartItems, setCartItems] = React.useState(4)
    const [showSearchBar, setShowSearchBar] = React.useState(true)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [searched, setSearched] = React.useState('')

    const handleMenuClose = () => setAnchorEl(null)

    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const redirect = (path: string) => {
        handleMenuClose()
        history.push(path)
    }

    const onSearch = (e: any) => {
        e.preventDefault()
        if (searched) redirect(`/search/${searched}`)
    }

    const menuId = 'nav-account-menu'

    const menuContent = (
        <div>
            <Typography color={'textSecondary'} className={classes.menuText}>
                Entra con tu cuenta
            </Typography>
            <MenuItem onClick={() => redirect('/login')}>
                <ListItemIcon color="inherit">
                    <Person />
                </ListItemIcon>
                Login
            </MenuItem>

            <Typography color={'textSecondary'} className={classes.menuText}>
                ¿No tienes? Regístrate
            </Typography>
            <MenuItem onClick={() => redirect('/signup')}>
                <ListItemIcon color="inherit">
                    <SignUp />
                </ListItemIcon>
                Sign up
            </MenuItem>
        </div>
    )

    const menuContentLogged = (
        <div>
            <MenuItem onClick={() => redirect('/profile')}>
                <ListItemIcon aria-controls={menuId} color="inherit">
                    <AccountCircle />
                </ListItemIcon>
                <Typography className={classes.usernameMenu}>
                    username
                </Typography>
            </MenuItem>

            <Divider className={classes.divider} color={'transparent'} />

            <MenuItem onClick={() => redirect('/favorites')}>
                <ListItemIcon color="inherit">
                    <Favorite />
                </ListItemIcon>
                Favorites
            </MenuItem>

            <MenuItem onClick={() => redirect('/product/publish')}>
                <ListItemIcon color="inherit">
                    <Add />
                </ListItemIcon>
                Upload product
            </MenuItem>

            <Divider className={classes.divider} light />

            <MenuItem onClick={() => redirect('/logout')}>
                <ListItemIcon color="inherit">
                    <ExitToApp />
                </ListItemIcon>
                Logout
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

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar variant={'dense'}>
                    <Typography className={classes.title} variant="h6">
                        Shop
                    </Typography>

                    {showSearchBar && (
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
                                    placeholder="Search"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={(e) =>
                                        setSearched(e.target.value)
                                    }
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
                    )}

                    <div className={classes.grow} />

                    <IconButton
                        onClick={() => redirect('/cart')}
                        color="inherit"
                    >
                        <Badge badgeContent={cartItems} color="secondary">
                            <ShoppingBasket />
                        </Badge>
                    </IconButton>

                    <IconButton
                        edge="end"
                        onClick={handleMenuOpen}
                        color="inherit"
                    >
                        {logged ? (
                            <Avatar className={classes.avatar}>XX</Avatar>
                        ) : (
                            <AccountCircle fontSize="large" />
                        )}
                    </IconButton>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    )
}

export default NavigationBar
