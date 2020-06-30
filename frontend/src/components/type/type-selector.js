import React, { Component } from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Grid } from '@material-ui/core'
import { getTypesByWarehouse_id } from '../../actions/type-action'

class TypeSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            anchorEl: null
        }
    }

    componentDidMount = () => {
        this.props.getTypesByWarehouse_id(this.props.warehouse_selected_id)
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
        const { selectedIndex, anchorEl } = this.state
        const { types } = this.props
        return (
            <div>
                {
                    types.length > 0 ?
                        <div>
                            <List component="nav" aria-label="Device settings">
                                <ListItem
                                    button
                                    aria-haspopup="true"
                                    aria-controls="lock-menu"
                                    // aria-label="when device is locked"
                                    onClick={(e) => this.handleClickListItem(e)}
                                >
                                    <ListItemText primary="Loại hàng hóa"
                                        secondary={types[selectedIndex].typename}
                                    />
                                </ListItem>
                            </List>
                            <Menu
                                id="lock-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => this.handleClose()}
                            >
                                {types.map((type, index) => (
                                    <MenuItem
                                        key={type.type_id}
                                        // disabled={index === 0}
                                        selected={index === selectedIndex}
                                        onClick={(event) => this.handleMenuItemClick(event, index)}
                                    >
                                        {type.typename}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                        : null
                }
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    types: state.typeReducer.types,
    warehouse_selected_id: state.warehouseReducer.warehouse_selected_id
})

const mapDispatchToProps = {
    getTypesByWarehouse_id
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeSelector)