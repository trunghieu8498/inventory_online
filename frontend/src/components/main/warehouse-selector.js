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
            open: false,
            options: [],
            ITEM_HEIGHT: 48
        }
    }

    componentDidUpdate () {
        console.log(this.props.warehouses)
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
        const { options, ITEM_HEIGHT } = this.state
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography>Warehouse Name</Typography>
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
                                        marginLeft: '14rem',
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: '20ch',
                                    },
                                }}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option} selected={option === 'Pyxis'}>
                                        {option}
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
    warehouses: state.warehouseReducer.warehouses,
    customer_id: state.authReducer.customer_id
})

const mapDispatchToProps = {
    //getWarehousesByCustomer_id
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseSelector)