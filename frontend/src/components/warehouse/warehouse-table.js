import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grow, Button, Grid } from '@material-ui/core'
import MaterialTable, { MTableToolbar } from 'material-table';
import {Link} from 'react-router-dom'
import { SuggestCreateWarehouseForm } from './suggestCreateWarehouse-form'
import { getWarehousesByCustomer_id } from '../../actions/warehouse-action'

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
        const { customer_id } = this.props.customer_logged
        this.props.getWarehousesByCustomer_id(customer_id)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.warehouses !== this.props.warehouses)
            this.setState({
                data: this.props.warehouses
            })
    }

    render() {
        const warehouses = this.props.warehouses

        const table = (
            <Grow in={true}>
                <MaterialTable
                    title="DANH SÁCH KHO"
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
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                    style={{ marginBottom: '1rem' }}
                >
                    <Link to='/warehouse/add'>
                        <Button variant="contained" size="small" color="primary">Thêm kho mới</Button>
                    </Link>
                </Grid>
                {table}
            </div>

            // <div>
            //     {
            //         this.props.warehouses.length > 0 ?
            //             <TableContainer component={Paper}>
            //                 <Table aria-label="simple table">
            //                     <TableHead>
            //                         <TableRow>
            //                             <TableCell><b>#</b></TableCell>
            //                             <TableCell><b>Tên kho</b></TableCell>
            //                             <TableCell><b>Địa chỉ</b></TableCell>
            //                             <TableCell><b>Mô tả</b></TableCell>
            //                             {/* <TableCell align="right"><b>Tổng giá trị</b></TableCell> */}
            //                         </TableRow>
            //                     </TableHead>
            //                     <TableBody>
            //                     </TableBody>
            //                 </Table>
            //                 {warehouses.map((row) => (
            //                     <TableRow key={warehouses.indexOf(row)}>
            //                         <TableCell >{warehouses.indexOf(row) + 1}</TableCell>
            //                         <TableCell >{row.warehousename}</TableCell>
            //                         <TableCell align="right">{row.address}</TableCell>
            //                         <TableCell align="right">{row.description}</TableCell>
            //                     </TableRow>
            //                 ))}
            //             </TableContainer>
            //             :
            //             <SuggestCreateWarehouseForm />
            //     }
            // </div>
        )
    }
}

const mapStateToProps = (state) => ({
    warehouses: state.warehouseReducer.warehouses,
    customer_logged: state.authReducer.customer_logged
})

const mapDispatchToProps = {
    getWarehousesByCustomer_id
}

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseTable)
