import React, { Component } from "react"
import { connect } from 'react-redux'
// import CartList from './lists/cartList'
import { Link } from 'react-router-dom'
import { Button, Modal, Card } from '@material-ui/core';

class RecievedNoteDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
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
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    render() {
        return (
            <div>
                <Button
                    variant="contained"
                    size="medium"
                    // style={{ backgroundColor: '#ffab00' }}
                    onClick={() => this.handleShow()}>
                    Xem chi tiet
                </Button>
                <Modal
                    open={this.state.show}
                    onClose={() => this.handleClose()}
                    style={{position: 'absolute'}}
                >
                    <Card>
                        <p>table ne</p>
                    </Card>
                </Modal>
            </div >
        )
    }
}
const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, null)(RecievedNoteDetailModal);