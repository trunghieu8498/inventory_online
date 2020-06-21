import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Grid } from '@material-ui/core'
import { logout } from '../../actions/auth-action'
import { Redirect } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography variant="h6">
                                    INVENTORY ONLINE
                                </Typography>
                            </Grid>
                            <Grid item>
                                <div></div>
                            </Grid>
                            <Grid item>
                                {this.props.isAuthenticated ? <Button color="inherit" onClick={() => this.props.logout()}>Logout</Button> : <Redirect to='/login'/>}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

/*
import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


import { Grid, Button } from '@material-ui/core'

class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    handleDrawerClose() {
        this.setState({ open: false })
    }

    handleDrawerOpen() {
        this.setState({ open: true })
    }

    render() {
        return (
            <div role="presentation">
                <AppBar position="fixed">
                    <Toolbar>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography variant="h6" noWrap >
                                    Inventory Online
                                </Typography>
                            </Grid>
                            <Grid item>
                                <div></div>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="end"
                                    onClick={() => this.handleDrawerOpen()}>
                                    <MenuIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Drawer
                    // variant="persistent"
                    anchor="right"
                    open={this.state.open}
                    onClose={() => this.handleDrawerClose()}
                >
                    <div>
                        <IconButton style={{ marginRight: '200px', width: '3rem' }} onClick={() => this.handleDrawerClose()}>
                            x
                        </IconButton>
                    </div>
                    <Divider />
                    <List component="nav" aria-label="main mailbox folders" onClick={e => this.handleDrawerClose()}>
                        <Link to="/transaction" style={{ textDecoration: 'none' }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary="Xuất hàng" />
                            </ListItem>
                        </Link>
                        <Link to="/storage" style={{ textDecoration: 'none' }}>
                            <ListItem button>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary="Kho hàng" />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
            </div>
        )
    }
}
export default Navbar
*/