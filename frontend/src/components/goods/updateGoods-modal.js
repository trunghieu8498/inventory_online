
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField, Grid, Card, Typography, Button, CardContent, CardActions } from '@material-ui/core'
import { updateGoods } from '../../actions/goods-action'
import { connect } from 'react-redux'
import TypeSelector from '../type/type-selector'


class UpdateGoodsModal extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        console.log(props)
        this.state = {
            goodsName: '',
            weight: '',
            inventoryNumber: '',
            description: '',
            costPrice: '',
            sellingPrice: '',
            show: false,
            goods_id: props.goods_id
        }
        this.goodsNameTextfield = React.createRef()
    }

    handleSubmit = (e) => {
        const { goods_id, goodsName, weight, description, costPrice, sellingPrice, inventoryNumber, type_id } = this.state
        e.preventDefault()
        this.props.updateGoods(this.props.goods_id, goodsName, weight, description, costPrice, sellingPrice, inventoryNumber, type_id)
        this.resetInput()
    }
    
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

    resetInput = () => {
        this.setState({
            goodsName: '',
            weight: '',
            inventoryNumber: '',
            description: '',
            costPrice: '',
            sellingPrice: '',
        })
    }
    handleOpen = () => {
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }
    render() {
        const updateForm = (
            <div style={{ width: '20rem' }}>
                <Typography>
                    Sửa mặt hàng
                </Typography>
                <Card variant="outlined">
                    <CardContent>
                        <form onSubmit={this.handleSubmit} noValidate autoComplete="off" >
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="flex-start"
                                spacing={2}
                            >
                                <Grid item>
                                    <TextField name="goodsName"
                                        label="Tên hàng"
                                        variant="outlined"
                                        value={this.state.goodsName}
                                        inputRef={this.goodsNameTextfield}
                                        autoFocus
                                        onChange={(e) => this.changeHandler(e)} />
                                </Grid>
                                <Grid item>
                                    <TextField name="weight"
                                        label="Khối lượng"
                                        variant="outlined"
                                        value={this.state.weight}
                                        onChange={(e) => this.changeHandler(e)} />
                                </Grid>
                                <Grid item>
                                    <TextField name="description"
                                        label="Mô tả"
                                        variant="outlined"
                                        value={this.state.description}
                                        onChange={(e) => this.changeHandler(e)} />
                                </Grid>
                                <Grid item>
                                    <TextField name="costPrice"
                                        label="Giá vốn"
                                        variant="outlined"
                                        value={this.state.costPrice}
                                        onChange={(e) => this.changeHandler(e)} />
                                </Grid>
                                <Grid item>
                                    <TextField name="sellingPrice"
                                        label="Giá bán"
                                        variant="outlined"
                                        value={this.state.sellingPrice}
                                        onChange={(e) => this.changeHandler(e)} />
                                </Grid>
                                <Grid item>
                                    <TextField name="inventoryNumber"
                                        label="Số lượng tồn"
                                        variant="outlined"
                                        value={this.state.inventoryNumber}
                                        onChange={(e) => this.changeHandler(e)} />
                                </Grid>
                                <Grid item>
                                    <TypeSelector />
                                </Grid> 

                                <Grid item>
                                    <Button type='submit' variant="contained" size="medium" color="primary">
                                        Thêm
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
        return (
            <div>
                <button type="button" onClick={() => this.handleOpen()}>
                    Sửa
          </button>
                <Modal
                    open={this.state.show}
                    onClose={() => this.handleClose()}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {updateForm}
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    types: state.typeReducer.types
})

const mapDispatchToProps = {
    updateGoods
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateGoodsModal);
