import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Typography } from '@material-ui/core'
import { Grid, Button } from '@material-ui/core'
import { selectGoods } from '../../actions/goods-action'
import { addReceivedNoteDetailToTable } from '../../actions/receivedNoteDetail-action'
import { addDeliveryNoteDetailToTable } from '../../actions/deliveryNoteDetail-action'

class GoodsSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // selectedIndex: 0,
            anchorEl: null
        }
    }

    handleClickListItem = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        })
    }

    // handleClickListItem2 = (event2) => {
    //     this.setState({
    //         anchorEl: event2.currentTarget
    //     })
    // }

    handleMenuItemClick = (event,
        // event2, 
        index) => {
        this.setState({
            // selectedIndex: index,
            anchorEl: null
        })
    }

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    }

    render() {
        const { goodss, receivedNoteDetails, deliveryNoteDetails } = this.props
        const { anchorEl, selectedIndex } = this.state
        return (
            <div>
                {goodss.length ?
                    <div style={{ marginLeft: '2rem' }}>
                        {/* <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={(e) => this.handleClickListItem(e)}
                        >
                            <MoreVertIcon />
                        </IconButton> */}
                        <Button variant="contained" size="medium" color="primary"
                            onClick={(e) => this.handleClickListItem(e)}
                        >
                            Thêm hàng
                        </Button>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={() => this.handleClose()}
                        >
                            {goodss.map((goods, index) => (
                                <div>
                                    {
                                        goods.available ?
                                            <MenuItem
                                                key={goods.goods_id}
                                                // disabled={index === 0}
                                                // selected={index === selectedIndex}
                                                // onClick={(event) => this.props.selectGoods(goods.goods_id)}
                                                onClick={(event) => window.location.href === 'http://localhost:3000/receivednote/add' ?
                                                    this.props.addReceivedNoteDetailToTable(goods, receivedNoteDetails) : this.props.addDeliveryNoteDetailToTable(goods, deliveryNoteDetails)}
                                            // onClick={(event2) => this.props.addDeliveryNoteDetailToTable(goods, deliveryNoteDetails)}
                                            >
                                                {goods.goodsname}
                                            </MenuItem>
                                            : null
                                    }
                                </div>
                            ))}
                        </Menu>
                    </div>
                    : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    goods_selected_id: state.goodsReducer.goods_selected_id,
    goodss: state.goodsReducer.goodss,
    customer_id: state.authReducer.customer_id,
    receivedNoteDetails: state.receivedNoteReducer.receivedNoteDetails,
    deliveryNoteDetails: state.deliveryNoteReducer.deliveryNoteDetails
})

const mapDispatchToProps = {
    // getWarehousesByCustomer_id,
    selectGoods,
    addReceivedNoteDetailToTable,
    addDeliveryNoteDetailToTable
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsSelector)