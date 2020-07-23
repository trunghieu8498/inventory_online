import React, { Component } from "react";
import { connect } from "react-redux";
import { Grow, Button, Grid } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import { Link } from "react-router-dom";
import { SuggestCreateWarehouseForm } from "./suggestCreateWarehouse-form";
import {
  getWarehousesByCustomer_id,
  selectWarehouse,
  loadWarehouse,
  deleteWarehouse,
} from "../../actions/warehouse-action";
import { MoonLoader } from "react-spinners";
import UpdateWarehouseModal from "./updateWarehouse-modal";
//icon
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export class WarehouseTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "ID", field: "warehouse_id" },
        { title: "Tên kho", field: "warehousename" },
        { title: "Địa chỉ", field: "address" },
        { title: "Mô tả", field: "description" },
        { title: "Tình trạng", field: "available" },
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
    if (prevProps.warehouses !== this.props.warehouses) {
      let arr = [];
      this.props.warehouses.forEach((warehouse) => {
        let available;
        if (warehouse.available) available = "Tồn tại";
        else available = "Đã xóa";

        const temp = {
          warehouse_id: warehouse.warehouse_id,
          warehousename: warehouse.warehousename,
          address: warehouse.address,
          description: warehouse.description,
          available: available,
        };

        arr = [...arr, temp];
      });
      this.setState({
        data: arr,
      });
    }
    // if (prevProps.warehouses !== this.props.warehouses)
    //   this.setState({
    //     data: this.props.warehouses,

    //   });

    // if (prevProps.warehouses !== this.props.customer_id)
    //     this.props.getWarehousesByCustomer_id(this.props.customer_id)
  }

  // selectWarehouseHandle = (warehouse_id) => {
  //     this.props.selectWarehouse(warehouse_id)
  // }

  render() {
    const { warehouses, isLoading } = this.props;

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
              Delete: (_id) => {
                // console.log(_id)
                this.props.deleteWarehouse(_id);
              },
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
                <UpdateWarehouseModal warehouse_id={props.data.warehouse_id} />
                {props.data.available === "Tồn tại" ? (
                  <IconButton>
                    <DeleteIcon
                      onClick={() =>
                        props.action.Delete(props.data.warehouse_id)
                      }
                    >
                      {/* onClick={(e) => console.log('id ne` ',props.data.type_id)}> */}
                    </DeleteIcon>
                  </IconButton>
                ) : null}
                {/* <Button variant="outlined" color="primary" onClick={() => props.action.select(props.data.warehouse_id)}>Chọn</Button> */}
              </div>
            ),
          }}
        />
      </Grow>
    );

    if (!isLoading) {
      return (
        <div>
          {warehouses.length ? (
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
  isLoading: state.loadReducer.isLoading,
});

const mapDispatchToProps = {
  getWarehousesByCustomer_id,
  selectWarehouse,
  deleteWarehouse,
};

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseTable);
