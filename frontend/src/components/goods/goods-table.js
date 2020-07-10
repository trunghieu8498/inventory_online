import React, { Component } from "react";
import { connect } from "react-redux";
import { Grow, Button, Grid } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import { Link } from "react-router-dom";
import { SuggestCreateWarehouseForm } from "../warehouse/suggestCreateWarehouse-form";
// import { getGoodsByWarehouse_id } from '../../actions/goods-action'
import { MoonLoader } from "react-spinners";
// import { makeStyles } from "@material-ui/core/styles";
// import LinearProgress from "@material-ui/core/LinearProgress";
import UpdateGoodsModal from './updateGoods-modal'

export class GoodsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "ID", field: "goods_id" },
        { title: "Tên hàng", field: "goodsname" },
        { title: "Giá vốn", field: "costprice" },
        { title: "Giá bán", field: "sellingprice" },
        { title: "Số lượng hàng tồn", field: "inventorynumber" },
      ],
      data: [],
    };
  }

  componentWillMount() {
    // if (this.props.warehouse_selected_id !== null)
    //     this.props.getGoodsByWarehouse_id(this.props.warehouse_selected_id)
    this.setState({
      data: this.props.goodss,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      warehouse_selected_id,
      goodss,
      getGoodsByWarehouse_id,
    } = this.props;

    if (prevProps.goodss !== goodss)
      this.setState({
        data: goodss,
      });

    // if (prevProps.warehouse_selected_id !== warehouse_selected_id)
    //     getGoodsByWarehouse_id(this.props.warehouse_selected_id)
  }

  // render() {
  //   const table = (
  //     <Grow in={true}>
  //       <MaterialTable
  //         title="DANH SÁCH HÀNG HÀNG HÓA"
  //         columns={this.state.columns}
  //         data={this.state.data}
  //         // actions={[
  //         //     {
  //         //         icon: 'save',
  //         //         tooltip: 'Save User',
  //         //         Update: (e, rowData) => alert("You updated " + rowData.name),
  //         //         Delete: (e, rowData) => alert("You deleted " + rowData.name),
  //         //     },

  //         // ]}
  //         components={{
  //           Toolbar: (props) => (
  //             <div style={{ backgroundColor: "#e8eaf5" }}>
  //               <MTableToolbar {...props} />
  //             </div>
  //           ),
  //           Action: (props) => (
  //             <div></div>
  //             // <Row>
  //             //     <IconButton aria-label="edit" style={{ color: '#009FFF' }}
  //             //         onClick={(event) => props.action.Update(event, props.data)}>
  //             //         <EditIcon />
  //             //     </IconButton>
  //             //     <IconButton aria-label="delete" style={{ color: '#ec2F4B' }}
  //             //         // onClick={(e) => { this.handleDelete(e, _id) }}
  //             //         onClick={(event) => props.action.Update(event, props.data)}
  //             //     >
  //             //         <DeleteIcon />
  //             //     </IconButton>
  //             // </Row>
  //           ),
  //         }}
  //       />
  //     </Grow>
  //   );
    render() {
        const table = (
            <Grow in={true}>
                <MaterialTable
                    title="DANH SÁCH HÀNG HÀNG HÓA"
                    columns={this.state.columns}
                    data={this.state.data}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            // Update: (e, rowData) => alert("You updated " + rowData.name),
                            // Delete: (e, rowData) => alert("You deleted " + rowData.name),
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
                                <UpdateGoodsModal goods_id={props.data.goods_id}/>
                                
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
                      }}/>
              </Grow>
    )
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
                <Link to="/goods/add" style={{ textDecoration: "none" }}>
                  <Button variant="contained" size="small" color="primary">
                    Thêm mặt hàng
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
      return(
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
      )
    }
  }
}



const mapStateToProps = (state) => ({
  warehouses: state.warehouseReducer.warehouses,
  goodss: state.goodsReducer.goodss,
  warehouse_selected_id: state.warehouseReducer.warehouse_selected_id,
});

const mapDispatchToProps = {
  // getGoodsByWarehouse_id
};

export default connect(mapStateToProps, mapDispatchToProps)(GoodsTable);
