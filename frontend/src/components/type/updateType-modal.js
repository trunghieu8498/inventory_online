import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField, Grid, Card, Typography, Button, CardContent, CardActions } from '@material-ui/core'
import {updateType} from '../../actions/type-action'
import { connect } from 'react-redux'


class UpdateTypeModal extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        console.log(props)
        this.state = {
            typeName: '',
            show: false,
            type_id: props.type_id
        }
        this.typeNameTextfield = React.createRef()
    }

    handleSubmit = (e) => {
        const { typeName, type_id } = this.state
        e.preventDefault()
        console.log(type_id)
        this.props.updateType(this.props.type_id,typeName)
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
                    Cập nhật loại hàng
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
                                    <TextField name="typeName"
                                        label="Tên loại"
                                        variant="outlined"
                                        value={this.state.typeName}
                                        inputRef={this.typeNameTextfield}
                                        autoFocus
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
           Sửa Loại Hàng
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
updateType
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTypeModal)