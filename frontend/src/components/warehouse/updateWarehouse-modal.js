import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField, Grid, Card, Typography, Button, CardContent, CardActions } from '@material-ui/core'
import {updateWarehouse} from '../../actions/warehouse-action'
import { connect } from 'react-redux'


class UpdateWarehouseModal extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        console.log(props)
        this.state = {
            warehouseName: '',
            address: '',
            description: '',
            show: false,
            warehouse_id: props.warehouse_id
        }
        this.typeNameTextfield = React.createRef()
    }

    handleSubmit = (e) => {
        const { warehouseName, address, description, warehouse_id } = this.state
        e.preventDefault()
        console.log(warehouse_id)
        this.props.updateWarehouse2222(this.props.warehouse_id, warehouseName, address, description )
        this.resetInput()
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    resetInput = () => {
        this.setState({
            typeName: '',
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
render(){
    const updateForm = (
        <div style={{width:'20rem'}}>
                <Typography>
                    Cập nhật kho hàng
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
                                    <TextField name="warehouseName"
                                        label="Tên kho"
                                        variant="outlined"
                                        value={this.state.warehouseName}
                                        inputRef={this.warehouseNameTextfield}
                                        autoFocus
                                        onChange={(e) => this.changeHandler(e)} />
                                </Grid>
                                <Grid item>
                                    <TextField name="address"
                                        label="Địa chỉ"
                                        variant="outlined"
                                        value={this.state.address}
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
                                    <Button type='submit' variant="contained" size="medium" color="primary">
                                        Cập nhật
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
          <button type="button" onClick={()=> this.handleOpen()}>
           Sửa Kho Hàng
          </button>
          <Modal
            open={this.state.show}
            onClose={()=> this.handleClose()}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {/* <UpdateTypeForm/> */}

            {updateForm}
          </Modal>
        </div>
      )
    }  
}
const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
updateWarehouse
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateWarehouseModal)