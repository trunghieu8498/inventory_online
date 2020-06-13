import React, { Component } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Divider from '@material-ui/core/Divider';
import WarehouseSelector from '../main/warehouse-selector'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'

class Sidebar extends Component {
    render() {
        return (
            <div>
                <div style={{ backgroundColor: '#98aacd' }}>
                    <WarehouseSelector />
                </div>
                <Paper>
                    <MenuList>
                        <MenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">Hàng hóa</Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <PriorityHighIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">Nhập kho</Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <DraftsIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">Xuất kho</Typography>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)