import React, { Component } from 'react'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import WarehouseSelector from '../main/warehouse-selector'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getWarehousesByCustomer_id, getWarehouseAsAdmin } from '../../actions/warehouse-action'
import { getGoodsByWarehouse_id, getGoodsAsAdmin } from '../../actions/goods-action'
import { getTypesByWarehouse_id } from '../../actions/type-action'
//Icon
import AllInboxIcon from '@material-ui/icons/AllInbox';
import BallotIcon from '@material-ui/icons/Ballot';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { getCustomersAsAdmin } from '../../actions/customer-action'
import { getReceivedNotesByWarehouse_id } from '../../actions/receivedNote-action'
import PeopleIcon from '@material-ui/icons/People';

class Sidebar extends Component {

    componentDidMount = () => {
        if (this.props.isAdmin) {
            this.props.getCustomersAsAdmin()
            this.props.getWarehouseAsAdmin()
        }
        else
            this.props.getWarehousesByCustomer_id(this.props.customer_id)
    }

    componentDidUpdate = (prevProps) => {
        const { customer_id, warehouses, goodss, warehouse_selected_id, types, isAdmin } = this.props

        if (prevProps.customer_id !== customer_id) {
            if (isAdmin) {
                this.props.getCustomersAsAdmin()
                this.props.getWarehouseAsAdmin()
            }
            else
                this.props.getWarehousesByCustomer_id(customer_id)
        }

        if (prevProps.warehouse_selected_id !== warehouse_selected_id && warehouse_selected_id !== '') {
            this.props.getGoodsByWarehouse_id(warehouse_selected_id, isAdmin)
            this.props.getTypesByWarehouse_id(warehouse_selected_id, isAdmin)
            this.props.getReceivedNotesByWarehouse_id(warehouse_selected_id)
        }
        // if (prevProps.warehouse_selected_id !== warehouse_selected_id && warehouse_selected_id !== '' && isAdmin) {
        //     this.props.getGoodsAsAdmin()
        // }
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
                        <Divider />
                        {this.props.isAdmin ?
                            <Link to='/customer' style={{ textDecoration: 'none' }}>
                                <MenuItem>
                                    <ListItemIcon>
                                        <PeopleIcon fontSize="small" />
                                    </ListItemIcon>
                                    <Typography variant="inherit">Người dùng</Typography>
                                </MenuItem>
                            </Link>
                            : null
                        }
                    </MenuList>
                </Paper>
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    customer_id: state.authReducer.customer_id,
    warehouses: state.warehouseReducer.warehouses,
    warehouse_selected_id: state.warehouseReducer.warehouse_selected_id,
    goodss: state.goodsReducer.goodss,
    types: state.typeReducer.types,
    isAdmin: state.authReducer.isAdmin,
    customers: state.customerReducer.customers
})

const mapDispatchToProps = {
    getWarehousesByCustomer_id,
    getGoodsByWarehouse_id,
    getTypesByWarehouse_id,
    getReceivedNotesByWarehouse_id,
    getWarehouseAsAdmin,
    getGoodsAsAdmin,
    getCustomersAsAdmin
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)