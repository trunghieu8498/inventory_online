import React, { Component } from "react";
import { connect } from "react-redux";
// import CartList from './lists/cartList'
import { Link } from "react-router-dom";
import { Button, Modal, Card } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getReceivedNoteDetailByReceivedNoteId } from "../../actions/receivedNoteDetail-action";
//icon
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

class RecievedNoteDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receivedNoteId: props.receivedNoteId,
      rows: [],
      show: false,
    };
  }

  // handleConfirm = () => {
  //     if (this.props.isAuthenticated) {
  //         this.handleClose()
  //     }
  //     else
  //         alert('Bạn cần đăng nhập để xác nhận mua hàng')
  // }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = async () => {
    console.log(this.state.receivedNoteId);
    this.props.getReceivedNoteDetailByReceivedNoteId(this.state.receivedNoteId)
      .then((receivedNoteDetails) => {
        console.log(receivedNoteDetails);
        this.setState({
          rows: receivedNoteDetails,
          show: true,
        });
      });
  };

  render() {
    const table = (
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID phiếu nhập</TableCell>
                <TableCell align="right">Số lượng</TableCell>
                <TableCell align="right">Giá nhập</TableCell>
                <TableCell align="right">ID hàng hóa</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.receivednotedetail_id}
                  </TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.costprice}</TableCell>
                  <TableCell align="right">{row.goods_id}</TableCell>
                  <TableCell align='right'>
                    <IconButton>
                      <EditIcon/>
                    </IconButton>
                    <IconButton>
                      <DeleteOutlineIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );

    return (
      <div>
        <IconButton
          variant="contained"
          size="large"
          // style={{ backgroundColor: '#ffab00' }}
          onClick={() => this.handleShow()}
        >
          <InfoIcon/>
        </IconButton>
        <Modal
          open={this.state.show}
          onClose={() => this.handleClose()}
          style={{ position: "absolute" }}
        >
          <Card>{this.state.rows.length ? table : null}</Card>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  receivedNoteDetails: state.receivedNoteReducer.receivedNoteDetails,
});
const mapDispatchToProps = {
  getReceivedNoteDetailByReceivedNoteId,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecievedNoteDetailModal);
