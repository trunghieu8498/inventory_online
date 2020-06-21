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
import ReceivedNoteDetailTable from "./receivedNoteDetail-table";

class AddReceivedNoteForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    var today = new Date();
    this.state = {
      date:
        today.getDate() +
        " / " +
        (today.getMonth() + 1) +
        " / " +
        today.getFullYear(),
    };
    this.typeNameTextfield = React.createRef();
  }

  handleSubmit = (e) => {
    // const { typeName } = this.state
    // e.preventDefault()
    // this.props.addType(typeName, this.props.warehouse_selected_id)
    // this.resetInput()
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  resetInput = () => {
    this.setState({
      typeName: "",
    });
  };

  render() {
    return (
      <div>
        <Typography>Thêm phiếu nhập</Typography>
        <Card variant="outlined">
          <CardContent>
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
                    label="Ngày nhập"
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
                  <Button variant="contained" size="medium" color="primary">
                    Chọn hàng
                  </Button>
                </Grid>

                <Grid item>
                  <ReceivedNoteDetailTable />
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
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  warehouse_selected_id: state.warehouseReducer.warehouse_selected_id,
});

const mapDispatchToProps = {
  // addType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReceivedNoteForm);
