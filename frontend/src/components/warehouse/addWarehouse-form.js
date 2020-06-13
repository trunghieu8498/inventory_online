import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, Grid, Card, Typography, Button, CardContent, CardActions } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { signup } from '../../actions/auth-action'

class SuggestCreateWarehouse extends Component {
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
        const { customer_id } = this.props.customer_logged
        e.preventDefault()
        //this.props.addWarehouse(warehousename, address, description, customer_id)
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{ marginTop: '0rem' }}
                >
                    <Grid item>
                        <Typography variant="h5" component="h2" style={{ margin: '2rem' }}>
                            Welcome to InventoryOnline
                        </Typography>
                        <Card variant="outlined">
                            <CardContent>
                                <form onSubmit={this.handleSubmit} noValidate autoComplete="off" >
                                    <Grid
                                        container
                                        direction="column"
                                        justify="center"
                                        alignItems="center"
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
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    customer_logged: state.authReducer.customer_logged
})

const mapDispatchToProps = {
    //signup,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)