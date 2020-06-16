import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, Grid, Card, Typography, Button, CardContent, CardActions } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { login } from '../../actions/auth-action'

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            email: '',
            password: ''
        }
        this.emailTextfield = React.createRef()
    }

    handleSubmit = (e) => {
        const { email, password } = this.state
        e.preventDefault()
        this.props.login(email, password)
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
                                            <Button type='submit' variant="contained" size="medium" color="primary">
                                                Đăng nhập
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
                                    Bạn chưa có tài khoản?
                            <Link to="/signup">Đăng ký ngay</Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {this.props.isAuthenticated ?
                    <Redirect to='/warehouse' />
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

const mapDispatchToProps = {
    login,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)