import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import Sidebar from '../main/sidebar'
import HomeContent from './home-content'
import SuggestCreateWarehouseForm from '../warehouse/suggestCreateWarehouse-form'

export class Homepage extends Component {
    render() {
        return (
            <div style={{ backgroundColor: 'red' }}>
                {this.props.warehouses.length > 0 ?
                    <p> xin chao </p>
                    :
                    <SuggestCreateWarehouseForm/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
