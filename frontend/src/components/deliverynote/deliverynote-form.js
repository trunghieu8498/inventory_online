import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TextField,
  Grid,
  Card,
  Typography,
  Button,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { addType } from "../../actions/type-action";
import DeliveryNoteDetailTable from "./deliveryNoteDetail-table";
import GoodsSelector from "../goods/goods-selector";
import { addDeliveryNote } from "../../actions/deliveryNote-action";
import { Link } from "react-router-dom";
import { resetDeliveryNoteTable } from "../../actions/deliveryNoteDetail-action";

class AddDeliveryNoteForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    var today = new Date();
    this.state = {
      date:
        today.getMonth() +
        1 +
        " / " +
        today.getDate() +
        " / " +
        today.getFullYear(),
    };
  }

  componentDidMount = () => {
    this.props.resetDeliveryNoteTable();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { date } = this.state;
    const { deliveryNoteDetails, warehouse_selected_id } = this.props;
    this.props.addDeliveryNote(
      date,
      warehouse_selected_id,
      deliveryNoteDetails
    );
    this.props.resetDeliveryNoteTable();
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const form = (
      <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item>
            <TextField
              name="date"
              label="Ngày xuất"
              variant="outlined"
              value={this.state.date}
              inputRef={this.typeNameTextfield}
              autoFocus
              onChange={(e) => this.changeHandler(e)}
            />
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="right"
          >
            <GoodsSelector />
          </Grid>
          <Grid item>
            <DeliveryNoteDetailTable />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              size="medium"
              color="primary"
            >
              Xác nhận
            </Button>
          </Grid>
        </Grid>
      </form>
    );

    const note = (
      <div>
        <p>
          Bạn chưa có hàng hóa nào, vui lòng Thêm ít nhất 1 hàng hóa để tạo
          phiếu xuất
        </p>
        <Link to="/goods/add">Tạo ngay</Link>
      </div>
    );

    return (
      <div>
        <Typography>Thêm phiếu xuất</Typography>
        <Card variant="outlined">
          <CardContent>
            {this.props.goodss.length > 0 ? form : note}
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  warehouse_selected_id: state.warehouseReducer.warehouse_selected_id,
  deliveryNoteDetails: state.deliveryNoteReducer.deliveryNoteDetails,
  goodss: state.goodsReducer.goodss,
});

const mapDispatchToProps = {
  resetDeliveryNoteTable,
  addDeliveryNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDeliveryNoteForm);
