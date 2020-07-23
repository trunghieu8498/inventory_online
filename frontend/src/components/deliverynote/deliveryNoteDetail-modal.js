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
import { getDeliveryNoteDetailsByDeliveryNoteId } from "../../actions/deliveryNoteDetail-action";
//icon
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DeliveryNoteDetailTable from './deliveryNoteDetail-table'

class DeliveryNoteDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryNoteId: props.deliveryNoteId,
      // rows: [],
      show: false,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = async () => {
    this.props.getDeliveryNoteDetailsByDeliveryNoteId(this.state.deliveryNoteId)
      .then((deliveryNoteDetails) => {
        this.setState({
          // rows: deliveryNoteDetails,
          show: true,
        });
      });
  };

  render() {
    return (
      <div>
        <IconButton
          variant="contained"
          size="large"
          // style={{ backgroundColor: '#ffab00' }}
          onClick={() => this.handleShow()}
        >
          <InfoIcon />
        </IconButton>
        <Modal
          open={this.state.show}
          onClose={() => this.handleClose()}
        // style={{ position: "absolute" }}
        >
          <DeliveryNoteDetailTable />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  deliveryNoteDetails: state.deliveryNoteReducer.deliveryNoteDetails,
});

const mapDispatchToProps = {
  getDeliveryNoteDetailsByDeliveryNoteId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryNoteDetailModal);
