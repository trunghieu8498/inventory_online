import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grow, Button, Grid } from '@material-ui/core'
import MaterialTable, { MTableToolbar } from 'material-table';
import { Link } from 'react-router-dom'
import { SuggestCreateWarehouseForm } from '../warehouse/suggestCreateWarehouse-form'
import { MoonLoader } from "react-spinners";
import { getTypesByWarehouse_id, deleteType } from '../../actions/type-action'
import UpdateTypeModal from './updateType-modal'


export class TypeTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { title: 'ID', field: 'type_id' },
                { title: 'Tên loại', field: 'typename' },
            ],
            data: [],
        }
    }

    componentWillMount() {
        // try {
        //     if (this.props.warehouse_selected_id)
        //         this.props.getTypesByWarehouse_id(this.props.warehouse_selected_id)
        // }
        // catch (err) {
        //     console.log(err)
        // }
        this.setState({
            data: this.props.types
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.types !== this.props.types)
            this.setState({
                data: this.props.types
            })

        // if (prevProps.warehouse_selected_id !== this.props.warehouse_selected_id)
        //     this.props.getTypesByWarehouse_id(this.props.warehouse_selected_id)
    }

    render() {
        const table = (
            <Grow in={true}>
                <MaterialTable
                    title="DANH SÁCH LOẠI HÀNG"
                    columns={this.state.columns}
                    data={this.state.data}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            // Update: (e, rowData) => alert("You updated " + rowData.name),
                            Delete: (e, _id) => {
                                console.log(_id)
                                this.props.deleteType(e, _id)
                            }
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
                                <UpdateTypeModal type_id={props.data.type_id}/>

                                <Button onClick={(e)=> props.action.Delete(e,props.data.type_id)}>
                                    Xóa
                                </Button>                   
                            </div>
                    
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
        if(this.props.warehouses.length > 0){
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
                                <Link to='/type/add' style={{ textDecoration: 'none' }} >
                                    <Button variant="contained" size="small" color="primary">Thêm loại hàng</Button>
                                </Link>
                            </Grid>
                            {table}
                        </div>
                        :
                        <SuggestCreateWarehouseForm />
                    }
                </div>
            );
        }else{
            return (
                <Grid container direction="row" justify="center" alignItems="center">
                  <Grid item>
                    <div style={{ float: "center" }}>
                      <MoonLoader
                        color="#33bbff"
                        size="60"
                        animation="border"
                        role="status"
                        style={{ height: "10vh", width: "10vh" }}
                      >
                        <span>
                          <strong style={{ fontSize: "5vh" }}>Loading...</strong>
                        </span>
                      </MoonLoader>
                    </div>
                  </Grid>
                </Grid>
              );
        }
        
    }
}

const mapStateToProps = (state) => ({
    types: state.typeReducer.types,
    warehouses: state.warehouseReducer.warehouses,
    warehouse_selected_id: state.warehouseReducer.warehouse_selected_id
})

const mapDispatchToProps = {
    getTypesByWarehouse_id,
    deleteType
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeTable)
