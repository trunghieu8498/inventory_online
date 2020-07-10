import React, { Component } from "react";
import { connect } from "react-redux";
import { Grow, Button, Grid } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import { Link } from "react-router-dom";
import { SuggestCreateWarehouseForm } from "./suggestCreateWarehouse-form";
import { getWarehousesByCustomer_id, selectWarehouse, loadWarehouse } from "../../actions/warehouse-action";
import { IconButton, EditIcon } from "@material-ui/icons";
import { MoonLoader } from "react-spinners";
import UpdateWarehouseModal from './updateWarehouse-modal'

export class WarehouseTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "ID", field: "warehouse_id" },
        { title: "Tên kho", field: "warehousename" },
        { title: "Địa chỉ", field: "address" },
        { title: "Mô tả", field: "description" },
      ],
      data: [],
    };
  }

  componentWillMount() {
    // this.props.getWarehousesByCustomer_id(this.props.customer_id)
    this.setState({
      data: this.props.warehouses,
    });
  }

  // loadWarehouse() {
  //     const warehouse_selected_id_before = localStorage.getItem('warehouse_selected_id')
  //     this.props.selectWarehouse(warehouse_selected_id_before)
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.warehouses !== this.props.warehouses)
      this.setState({
        data: this.props.warehouses,
      });
    // if (prevProps.warehouses !== this.props.customer_id)
    //     this.props.getWarehousesByCustomer_id(this.props.customer_id)
  }

  // selectWarehouseHandle = (warehouse_id) => {
  //     this.props.selectWarehouse(warehouse_id)
  // }

  render() {
    const warehouses = this.props.warehouses;
    const table = (
      <Grow in={true}>
        <MaterialTable
          title="DANH SÁCH KHO"
          columns={this.state.columns}
          data={this.state.data}
          actions={[
            {
              icon: "save",
              tooltip: "Save User",
              // Update: (e, rowData) => alert("You updated " + rowData.name),
              // Delete: (e, rowData) => alert("You deleted " + rowData.name),
              // select: (warehouse_id) => this.selectWarehouseHandle(warehouse_id)
            },
          ]}
          components={{
            Toolbar: (props) => (
              <div style={{ backgroundColor: "#e8eaf5" }}>
                <MTableToolbar {...props} />
              </div>
            ),
            Action: (props) => (
              <div>
                {/* <Button variant="outlined" color="primary" onClick={() => props.action.select(props.data.warehouse_id)}>Chọn</Button> */}
                {/* <IconButton aria-label="edit" style={{ color: '#009FFF' }}
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
                            // select: (warehouse_id) => this.selectWarehouseHandle(warehouse_id)
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
                                <UpdateWarehouseModal warehouse_id={props.data.warehouse_id}/>                                                   
                                {/* <Button variant="outlined" color="primary" onClick={() => props.action.select(props.data.warehouse_id)}>Chọn</Button> */}
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
    );
    if (this.props.warehouses.length > 0) {
      return (
        <div>
          {this.props.warehouses.length ? (
            <div>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-start"
                style={{ marginBottom: "1rem" }}
              >
                <Link to="/warehouse/add" style={{ textDecoration: "none" }}>
                  <Button variant="contained" size="small" color="primary">
                    Thêm kho
                  </Button>
                </Link>
              </Grid>
              {table}
            </div>
          ) : (
              <SuggestCreateWarehouseForm />
            )}
        </div>
      );
    } else {
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
  warehouses: state.warehouseReducer.warehouses,
  customer_id: state.authReducer.customer_id,
});

const mapDispatchToProps = {
  getWarehousesByCustomer_id,
  selectWarehouse,
};

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseTable);
