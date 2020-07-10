import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grow, Button, Grid } from '@material-ui/core'
import MaterialTable, { MTableToolbar } from 'material-table';
import { Link } from 'react-router-dom'
import { SuggestCreateWarehouseForm } from '../warehouse/suggestCreateWarehouse-form'
// import { getWarehousesByCustomer_id } from '../../actions/warehouse-action'
import { getReceivedNotesByWarehouse_id } from '../../actions/receivedNote-action'

export class ReceivedNoteTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { title: 'ID', field: 'receivednote_id' },
                { title: 'Ngày tạo', field: 'date' },
                { title: 'Tổng giá trị', field: 'sum' },//sum tự tính
            ],
            data: [],
        }
    }

    componentDidMount() {
        const { warehouse_selected_id } = this.props
        this.props.getReceivedNotesByWarehouse_id(warehouse_selected_id)
    }

    componentDidUpdate(prevProps) {
        const{receivedNotes, warehouse_selected_id} = this.props
        if (prevProps.receivedNotes !== receivedNotes)
            this.setDataTable(receivedNotes)

        if (prevProps.warehouse_selected_id !== warehouse_selected_id)
            this.props.getReceivedNotesByWarehouse_id(warehouse_selected_id)
    }

    setDataTable = (receivedNotes) => {
        this.setState(({
            data: receivedNotes
        }))
    }

    render() {
        const table = (
            <Grow in={true}>
                <MaterialTable
                    title="DANH SÁCH PHIẾU NHẬP KHO"
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
                {this.props.warehouses.length > 0 ?
                    <div>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-start"
                            style={{ marginBottom: '1rem' }}
                        >
                            <Link to='/receivednote/add' style={{ textDecoration: 'none' }} >
                                <Button variant="contained" size="small" color="primary">Tạo phiếu nhập kho</Button>
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
    warehouse_selected_id: state.warehouseReducer.warehouse_selected_id,
    receivedNotes: state.receivedNoteReducer.receivedNotes
})

const mapDispatchToProps = {
    getReceivedNotesByWarehouse_id
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedNoteTable)
