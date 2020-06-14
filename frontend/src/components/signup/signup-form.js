import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, Grid, Card, Typography, Button, CardContent, CardActions } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { signup } from '../../actions/auth-action'

class SignupForm extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            email: '',
            password: '',
            fullName: '',
            birthday: '',
            numberPhone: '',
        }
        this.emailTextfield = React.createRef()
    }

    handleSubmit = (e) => {
        const { email, password, fullName, birthday, numberPhone } = this.state
        e.preventDefault()
        this.props.signup(email, password, fullName, birthday, numberPhone)
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
                                            <TextField name="email"
                                                label="Email"
                                                variant="outlined"
                                                value={this.state.email}
                                                inputRef={this.emailTextfield}
                                                autoFocus
                                                type='email'
                                                onChange={(e) => this.changeHandler(e)} />
                                        </Grid>
                                        <Grid item>
                                            <TextField name="password"
                                                label="Mật khẩu"
                                                variant="outlined"
                                                value={this.state.password}
                                                type='password'
                                                onChange={(e) => this.changeHandler(e)} />
                                        </Grid>
                                        <Grid item>
                                            <TextField name="fullName"
                                                label="Tên"
                                                variant="outlined"
                                                value={this.state.fullName}
                                                onChange={(e) => this.changeHandler(e)} />
                                        </Grid>
                                        <Grid item>
                                            <TextField name="birthday"
                                                label="Ngày sinh"
                                                variant="outlined"
                                                value={this.state.birthday}
                                                onChange={(e) => this.changeHandler(e)} />
                                        </Grid>
                                        <Grid item>
                                            <TextField name="numberPhone"
                                                label="Số điện thoại"
                                                variant="outlined"
                                                value={this.state.numberPhone}
                                                onChange={(e) => this.changeHandler(e)} />
                                        </Grid>
                                        <Grid item>
                                            <Button type='submit' variant="contained" size="medium" color="primary">
                                                Đăng ký
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Typography variant="caption" display="block" gutterBottom style={{ marginBottom: '2rem' }}>
                                    Bạn đã có tài khoản?
                            <Link to="/login">Đăng nhập ngay</Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {this.props.customer_logged ?
                    <Redirect to='/home' />
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    customer_logged: state.authReducer.customer_logged
})

const mapDispatchToProps = {
    signup,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)