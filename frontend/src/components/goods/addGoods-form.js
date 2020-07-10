import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { TextField, Grid, Card, Typography, Button, CardContent, CardActions } from '@material-ui/core'
import { addGoods } from '../../actions/goods-action'
import TypeSelector from '../type/type-selector'


class AddGoodsForm extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            goodsName: '',
            weight: '',
            inventoryNumber: '',
            description: '',
            costPrice: '',
            sellingPrice: '',
        }
        this.goodsNameTextfield = React.createRef()
    }

    handleSubmit = (e) => {
        const { goodsName, weight, inventoryNumber, description, costPrice, sellingPrice } = this.state
        const { warehouse_selected_id, type_selected_id } = this.props
        e.preventDefault()
        this.props.addGoods(goodsName, weight, inventoryNumber, description, costPrice, sellingPrice, warehouse_selected_id, type_selected_id)
        this.resetInput()
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

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

    render() {
        return (
            <div>
                <Typography>
                    Thêm mặt hàng
                </Typography>
                <Card variant="outlined">
                    <CardContent>
                        {this.props.types.length > 0 ?
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
                                            label="Giá"
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
                            :
                            <div>
                                <p>Bạn chưa có loại mặt hàng nào, vui lòng tạo ít nhất 1 loại mặt hàng để thêm hàng hóa mới</p>
                                <Link to='/type/add'>Tạo ngay</Link>
                            </div>
                        }
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    warehouse_selected_id: state.warehouseReducer.warehouse_selected_id,
    type_selected_id: state.typeReducer.type_selected_id,
    types: state.typeReducer.types
})

const mapDispatchToProps = {
    addGoods
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGoodsForm)