import React, { Component, Fragment } from "react";
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
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';


export class ReceivedNoteDetailTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { receivedNoteDetails } = this.props

    const body = (
      <Fragment>
        {receivedNoteDetails.map((row) => (
          <TableRow key={row.goods.goodsname}>
            <TableCell component="th" scope="row">
              {row.goods.goods_id}
            </TableCell>
            <TableCell align="right">{row.goods.goodsname}</TableCell>
            <TableCell align="right">{row.goods.weight}</TableCell>
            <TableCell align="right">{row.costprice}</TableCell>
            <TableCell align="right">
              {row.quantity}
              {/* <FormControl variant="outlined">
                <OutlinedInput
                  value={row.quantity}
                  // onChange={handleChange('weight')}
                  labelWidth={0}
                  style={{width: '3rem'}}
                />
              </FormControl> */}
            </TableCell>
          </TableRow>
        ))}
      </Fragment>
    )

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
              {receivedNoteDetails.length ? body : null}
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

};

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedNoteDetailTable);