import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grow, Button, Grid } from '@material-ui/core'
import MaterialTable, { MTableToolbar } from 'material-table';
import { Link } from 'react-router-dom'
import { SuggestCreateWarehouseForm } from '../warehouse/suggestCreateWarehouse-form'
// import { getWarehousesByCustomer_id } from '../../actions/warehouse-action'

export class GoodsTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { title: 'ID', field: 'warehouse_id' },
                { title: 'Tên hàng', field: 'warehousename' },
                { title: 'Giá vốn', field: 'costprice' },
                { title: 'Giá bán', field: 'sellingprice' },
            ],
            data: [],
        }
    }

    componentDidMount() {
        //if (this.props.customer_id !== '')
        // this.props.getWarehousesByCustomer_id(this.props.customer_id)
    }

    componentDidUpdate(prevProps) {
        // if (prevProps.warehouses !== this.props.warehouses)
        //     this.setState({
        //         data: this.props.warehouses
        //     })

        // if (prevProps.customer_id !== this.props.customer_id)
        //     this.props.getWarehousesByCustomer_id(this.props.customer_id)
    }

    render() {
        const table = (
            <Grow in={true}>
                <MaterialTable
                    title="DANH SÁCH HÀNG HÀNG HÓA"
                    columns={this.state.columns}
                    data={this.state.data}
                    // actions={[
                    //     {
                    //         icon: 'save',
                    //         tooltip: 'Save User',
                    //         Update: (e, rowData) => alert("You updated " + rowData.name),
                    //         Delete: (e, rowData) => alert("You deleted " + rowData.name),
                    //     },

                    // ]}
                    components={{
                        Toolbar: props => (
                            <div style={{ backgroundColor: '#e8eaf5' }}>
                                <MTableToolbar {...props} />
                            </div>
                        ),
                        Action: props => (
                            <div></div>
                            // <Row>
                            //     <IconButton aria-label="edit" style={{ color: '#009FFF' }}
                            //         onClick={(event) => props.action.Update(event, props.data)}>
                            //         <EditIcon />
                            //     </IconButton>
                            //     <IconButton aria-label="delete" style={{ color: '#ec2F4B' }}
                            //         // onClick={(e) => { this.handleDelete(e, _id) }}
                            //         onClick={(event) => props.action.Update(event, props.data)}
                            //     >
                            //         <DeleteIcon />
                            //     </IconButton>
                            // </Row>
                        ),

                    }}
                />
            </Grow>
        )
        return (
            <div>
                {this.props.warehouses.length ?
                    <div>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-start"
                            style={{ marginBottom: '1rem' }}
                        >
                            <Link to='/warehouse/add' style={{ textDecoration: 'none' }} >
                                <Button variant="contained" size="small" color="primary">Thêm mặt hàng</Button>
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
    //getWarehousesByCustomer_id
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsTable)
