import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core'
import { SuggestCreateWarehouseForm } from '../warehouse/suggestCreateWarehouse-form'

class HomeContent extends Component {

    render() {
        return (
            <div>
            {
                this.props.warehouses.length > 0?
                <p> Home content </p>
                : <SuggestCreateWarehouseForm/>
            }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    warehouses: state.warehouseReducer.warehouses
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent)
