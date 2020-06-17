import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grow, Button, Grid } from '@material-ui/core'
import MaterialTable, { MTableToolbar } from 'material-table';
import { Link } from 'react-router-dom'
import { SuggestCreateWarehouseForm } from './suggestCreateWarehouse-form'
import { getWarehousesByCustomer_id, accessWarehouse } from '../../actions/warehouse-action'
import {IconButton, EditIcon} from '@material-ui/icons'

export class WarehouseTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { title: 'ID', field: 'warehouse_id' },
                { title: 'Tên kho', field: 'warehousename' },
                { title: 'Địa chỉ', field: 'address' },
                { title: 'Mô tả', field: 'description' },
            ],
            data: [],
        }
    }

    componentDidMount() {
        if (this.props.customer_id !== '')
            this.props.getWarehousesByCustomer_id(this.props.customer_id)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.warehouses !== this.props.warehouses)
            this.setState({
                data: this.props.warehouses
            })
        if (prevProps.customer_id !== this.props.customer_id)
            this.props.getWarehousesByCustomer_id(this.props.customer_id)
    }

    accessWarehouseHandle(e,warehouse_id){
        e.preventDefault()
        // console.log(warehouse_id)
        this.props.accessWarehouse(warehouse_id)
    }
    render() {
        const warehouses = this.props.warehouses

        const table = (
            <Grow in={true}>
                <MaterialTable
                    title="DANH SÁCH KHO"
                    columns={this.state.columns}
                    data={this.state.data}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            // Update: (e, rowData) => alert("You updated " + rowData.name),
                            // Delete: (e, rowData) => alert("You deleted " + rowData.name),
                            Access: (e,warehouse_id) => this.accessWarehouseHandle(e,warehouse_id)
                        },

                    ]}
                    components={{
                        Toolbar: props => (
                            <div style={{ backgroundColor: '#e8eaf5' }}>
                                <MTableToolbar {...props} />
                            </div>
                        ),
                        Action: props => (
                            <div>
                                <Button onClick={(e)=> props.action.Access(e,props.data.warehouse_id)}>Chon</Button>
                                {/* <IconButton aria-label="edit" style={{ color: '#009FFF' }}
                                    // onClick={(event) => props.action.Update(event, props.data)}
                                    >
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" style={{ color: '#ec2F4B' }}
                                    // onClick={(e) => { this.handleDelete(e, _id) }}
                                    // onClick={(event) => props.action.Update(event, props.data)}
                                >
                                    <DeleteIcon />
                                </IconButton> */}
                            </div>
                        ),

                    }}
                />
            </Grow>
        )
        return (
            <div>
                {this.props.warehouses.length > 0 ?
                    <div>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-start"
                            style={{ marginBottom: '1rem' }}
                        >
                            <Link to='/warehouse/add' style={{ textDecoration: 'none' }} >
                                <Button variant="contained" size="small" color="primary">Thêm kho</Button>
                            </Link>
                        </Grid>
                        {table}
                    </div>
                    :
                    <SuggestCreateWarehouseForm />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    warehouses: state.warehouseReducer.warehouses,
    customer_id: state.authReducer.customer_id
})

const mapDispatchToProps = {
    getWarehousesByCustomer_id,
    accessWarehouse
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseTable)
