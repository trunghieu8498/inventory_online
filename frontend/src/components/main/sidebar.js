import React, { Component } from 'react'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'
import PriorityHighIcon from '@material-ui/icons/PriorityHigh'
import Divider from '@material-ui/core/Divider'
import WarehouseSelector from '../main/warehouse-selector'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getWarehousesByCustomer_id } from '../../actions/warehouse-action'
import { getGoodsByWarehouse_id } from '../../actions/goods-action'
import { getTypesByWarehouse_id} from '../../actions/type-action'
//Icon
import AllInboxIcon from '@material-ui/icons/AllInbox';
import BallotIcon from '@material-ui/icons/Ballot';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import {getReceivedNotesByWarehouse_id} from '../../actions/receivedNote-action'

class Sidebar extends Component {

    componentDidMount = () => {
        this.props.getWarehousesByCustomer_id(this.props.customer_id)
    }

    componentDidUpdate = (prevProps) => {
        const { customer_id, warehouses, goodss, warehouse_selected_id } = this.props

        if (prevProps.customer_id !== customer_id){
            console.log('change')
            this.props.getWarehousesByCustomer_id(customer_id)
        }

        if (prevProps.warehouse_selected_id !== warehouse_selected_id){
            this.props.getGoodsByWarehouse_id(warehouse_selected_id)
            this.props.getTypesByWarehouse_id(warehouse_selected_id)
            this.props.getReceivedNotesByWarehouse_id(warehouse_selected_id)
        }
    }

    render() {
        return (
            <div>
                <div style={{ backgroundColor: '#98aacd' }}>
                    <WarehouseSelector />
                </div>
                <Paper>
                    <MenuList>
                        <Link to='/goods' style={{ textDecoration: 'none' }}>
                            <MenuItem>
                                <ListItemIcon>
                                    <AllInboxIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Hàng hóa</Typography>
                            </MenuItem>
                        </Link>
                        <Divider />
                        <Link to='/type' style={{ textDecoration: 'none' }}>
                            <MenuItem>
                                <ListItemIcon>
                                    <BallotIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Loại hàng</Typography>
                            </MenuItem>
                        </Link>
                        <Divider />
                        <Link to='/receivednote' style={{ textDecoration: 'none' }}>
                            <MenuItem>
                                <ListItemIcon>
                                    <ArchiveIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Nhập kho</Typography>
                            </MenuItem>
                        </Link>
                        <Divider />
                        <Link to='/deliverynote' style={{ textDecoration: 'none' }}>
                            <MenuItem>
                                <ListItemIcon>
                                    <UnarchiveIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Xuất kho</Typography>
                            </MenuItem>
                        </Link>
                        <Divider />
                        <Link to='/warehouse' style={{ textDecoration: 'none' }}>
                            <MenuItem>
                                <ListItemIcon>
                                    <AccountBalanceIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Kho hàng</Typography>
                            </MenuItem>
                        </Link>
                    </MenuList>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    customer_id: state.authReducer.customer_id,
    warehouses: state.warehouseReducer.warehouses,
    warehouse_selected_id: state.warehouseReducer.warehouse_selected_id,
    goodss: state.goodsReducer.goodss
})

const mapDispatchToProps = {
    getWarehousesByCustomer_id,
    getGoodsByWarehouse_id,
    getTypesByWarehouse_id,
    getReceivedNotesByWarehouse_id
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)