
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField, Grid, Card, Typography, Button, CardContent, CardActions } from '@material-ui/core'
import {updateWarehouse} from '../../actions/warehouse-action'
import { connect } from 'react-redux'
//icon
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

class UpdateWarehouseModal extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            warehousename: '',
            address: '',
            description: '',
            show: false,
            warehouse_id: props.warehouse_id
        }
        this.typeNameTextfield = React.createRef()
    }

    handleSubmit = (e) => {
        const { warehousename, address, description, warehouse_id } = this.state
        e.preventDefault()
        this.props.updateWarehouse2222(this.props.warehouse_id, warehousename, address, description )
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
                                    <TextField name="warehousename"
                                        label="Tên kho"
                                        variant="outlined"
                                        value={this.state.warehousename}
                                        inputRef={this.warehousenameTextfield}
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
          <IconButton type="button" onClick={()=> this.handleOpen()}>
           <EditIcon/>
          </IconButton>
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