import React, { Component } from "react";
import { connect } from "react-redux";
import { Grow, Button, Grid } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import { Link } from "react-router-dom";
import { SuggestCreateWarehouseForm } from "../warehouse/suggestCreateWarehouse-form";
// import { getWarehousesByCustomer_id } from '../../actions/warehouse-action'
import { MoonLoader } from "react-spinners";

export class DeliveryNoteTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "ID", field: "deliveryNote_id" },
        { title: "Ngày tạo", field: "date" },
        { title: "Tổng giá trị", field: "sum" }, //sum tự tính
      ],
      data: [],
    };
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
          title="DANH SÁCH PHIẾU XUẤT KHO"
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
            Toolbar: (props) => (
              <div style={{ backgroundColor: "#e8eaf5" }}>
                <MTableToolbar {...props} />
              </div>
            ),
            Action: (props) => (
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
                <Link to="/deliverynote/add" style={{ textDecoration: "none" }}>
                  <Button variant="contained" size="small" color="primary">
                    Tạo phiếu xuất kho
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
});

const mapDispatchToProps = {
  //getWarehousesByCustomer_id
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryNoteTable);
