import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, Grid, Card, Typography, Button, CardContent, CardActions } from '@material-ui/core'
import { addWarehouse } from '../../actions/warehouse-action'


class AddWarehouseForm extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            warehousename: '',
            address: '',
            description: '',
        }
        this.warehousenameTextfield = React.createRef()
    }

    handleSubmit = (e) => {
        const { warehousename, address, description } = this.state
        e.preventDefault()
        this.props.addWarehouse(warehousename, address, description, this.props.customer_id)

        this.resetInput()
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    resetInput = () => {
        this.setState({
            warehousename: '',
            address: '',
            description: '',
        })
    }

    render() {
        return (
            <div>
                <Typography>
                    Thêm kho mới
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
                                        Thêm
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    customer_id: state.authReducer.customer_id
})

const mapDispatchToProps = {
    addWarehouse
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWarehouseForm)