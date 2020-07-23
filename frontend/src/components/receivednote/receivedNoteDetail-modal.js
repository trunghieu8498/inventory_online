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
import { getReceivedNoteDetailsByReceivedNoteId } from "../../actions/receivedNoteDetail-action";
//icon
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ReceivedNoteDetailTable from './receivedNoteDetail-table'

class ReceivedNoteDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receivedNoteId: props.receivedNoteId,
      // rows: [],
      show: false,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = async () => {
    this.props.getReceivedNoteDetailsByReceivedNoteId(this.state.receivedNoteId)
      .then((receivedNoteDetails) => {
        this.setState({
          // rows: receivedNoteDetails,
          show: true,
        });
      });
  };

  render() {
    return (
      <div>
        <IconButton color="inherit"
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
          <ReceivedNoteDetailTable />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  receivedNoteDetails: state.receivedNoteReducer.receivedNoteDetails,
});

const mapDispatchToProps = {
  getReceivedNoteDetailsByReceivedNoteId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceivedNoteDetailModal);
