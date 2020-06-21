import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, Grid, Card, Typography, Button, CardContent, CardActions } from '@material-ui/core'
import { addType } from '../../actions/type-action'


class AddTypeForm extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            typeName: '',
        }
        this.typeNameTextfield = React.createRef()
    }

    handleSubmit = (e) => {
        const { typeName } = this.state
        e.preventDefault()
        this.props.addType(typeName, this.props.warehouse_selected_id)

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

    render() {
        return (
            <div>
                <Typography>
                    Thêm loại hàng
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
    warehouse_selected_id: state.warehouseReducer.warehouse_selected_id
})

const mapDispatchToProps = {
    addType
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTypeForm)