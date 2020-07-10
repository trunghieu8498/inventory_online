import React, { Component } from 'react';
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core'
import { getWarehousesByCustomer_id, selectWarehouse } from '../../actions/warehouse-action'

class WarehouseSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            anchorEl: null
        }
    }

    componentDidMount = () => {
        this.handleSetStateSelectedIndex()
    }

    componentDidUpdate = (prevProps, prevStates) => {
        const { selectedIndex } = this.state
        const { selectWarehouse, warehouses } = this.props

        if (prevStates.selectedIndex !== selectedIndex || selectedIndex === 0 && warehouses.length > 0) {
            selectWarehouse(warehouses[selectedIndex].warehouse_id)
        }
        if (prevProps.warehouses !== warehouses && warehouses.length > 0) {
            selectWarehouse(warehouses[selectedIndex].warehouse_id)
            this.handleSetStateSelectedIndex()
        }
    }

    handleSetStateSelectedIndex = () => {
        const { warehouses, warehouse_selected_id } = this.props
        if (warehouses.length > 0) {
            const index = this.handleFindIndex(warehouses, warehouse_selected_id)
            this.setState({
                selectedIndex: index
            })
            // console.log(index)
        }
    }

    handleFindIndex = (warehouses, warehouse_selected_id) => {
        const index = this.props.warehouses.findIndex(x => x.warehouse_id === this.props.warehouse_selected_id)
        if (index !== -1)
            return index
        else {
            console.log('khong tim thay id ' + warehouse_selected_id + ' trong ds warehouse_id, reset index=0')
            localStorage.setItem('warehouse_selected_id', warehouses[0].warehouse_id)
            return 0
        }
    }

    handleClickListItem = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        })
    }

    handleMenuItemClick = (event, index) => {
        this.setState({
            selectedIndex: index,
            anchorEl: null
        })
    }

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    }

    render() {
        const { warehouses, warehouse_selected_id } = this.props
        const { anchorEl, selectedIndex } = this.state
        return (
            <div>
                {warehouses.length ?
                    <div style={{ marginLeft: '2rem' }}>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography>{warehouses[selectedIndex].warehousename}</Typography>
                            </Grid>
                            <Grid item>
                                <div></div>
                            </Grid>
                            <Grid item>
                                <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={(e) => this.handleClickListItem(e)}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Grid item>
                                    <Menu
                                        id="long-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={() => this.handleClose()}
                                    >
                                        {warehouses.map((warehouse, index) => (
                                            <MenuItem
                                                key={warehouse.warehouse_id}
                                                // disabled={index === 0}
                                                selected={index === selectedIndex}
                                                onClick={(event) => this.handleMenuItemClick(event, index)}
                                            >
                                                {warehouse.warehousename}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    warehouse_selected_id: state.warehouseReducer.warehouse_selected_id,
    warehouses: state.warehouseReducer.warehouses,
    customer_id: state.authReducer.customer_id
})

const mapDispatchToProps = {
    getWarehousesByCustomer_id,
    selectWarehouse
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseSelector)