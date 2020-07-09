import React, { Component } from "react";
import { connect } from "react-redux";
import { Grow, Button, Grid } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import { Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export class ReceivedNoteDetailTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: []
    };
  }

  componentDidMount = () => {
    this.setState({
      rows: this.props.receivedNoteDetails
    })
  }

  componentDidUpdate = (prevProps, prevStates) => {
    const { receivedNoteDetails } = this.props
    if (prevProps.receivedNoteDetails !== receivedNoteDetails)
      this.setState({
        rows: this.props.receivedNoteDetails
      })
  }

  resetForm = () => {
    this.setState({
      rows: []
    })
  }

  render() {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Tên hàng</TableCell>
                <TableCell align="right">Khối lượng&nbsp;(g)</TableCell>
                <TableCell align="right">Giá nhập</TableCell>
                <TableCell align="right">Số lượng nhập</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.goods.goods_id}
                  </TableCell>
                  <TableCell align="right">{row.goods.goodsname}</TableCell>
                  <TableCell align="right">{row.goods.weight}</TableCell>
                  <TableCell align="right">{row.costprice}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  receivedNoteDetails: state.receivedNoteReducer.receivedNoteDetails,
})

const mapDispatchToProps = {
  // addType
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedNoteDetailTable);