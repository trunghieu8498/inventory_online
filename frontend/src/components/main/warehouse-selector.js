import React, { Component } from 'react';
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core'

class WarehouseSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            warehouseName: 'None',
            open: false,
            options: [1,2,3],
            ITEM_HEIGHT: 48
        }
    }

    componentDidUpdate(prevProps) {
        const { warehouses, warehouse_selected_id } = this.props
        if (warehouse_selected_id !== '' && prevProps.warehouse_selected_id !== warehouse_selected_id) {
            var warehouseName = this.getWarehouseName(warehouse_selected_id, warehouses)
            this.setState({
                warehouseName: warehouseName
            })
        }
    }

    getWarehouseName(warehouse_id, warehouses) {
        try {
            const warehouse = warehouses.find(warehouse => { return warehouse.warehouse_id === warehouse_id })
            return warehouse.warehousename
        }
        catch{
            return ''
        }
    }

    handleOpen = (e) => {
        this.setState({
            open: true
        })
    }

    handleClose = (e) => {
        this.setState({
            open: false
        })
    }

    render() {
        const { options, ITEM_HEIGHT, warehouseName } = this.state
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography>{warehouseName}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={e => this.handleOpen()}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Grid item>
                            <Menu
                                id="long-menu"
                                open={this.state.open}
                                keepMounted
                                onClose={e => this.handleClose(e)}
                                PaperProps={{
                                    style: {
                                        // marginLeft: '14rem',
                                        // maxHeight: ITEM_HEIGHT * 4.5,
                                        // width: '20ch',
                                    },
                                }}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option.warehouse_id}
                                    //  selected={option === 'Pyxis'}
                                    >
                                        {option.warehousename}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
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
    // getWarehousesByCustomer_id
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseSelector)