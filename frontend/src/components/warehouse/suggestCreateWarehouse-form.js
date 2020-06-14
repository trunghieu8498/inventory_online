import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Card, Grid, Typography } from '@material-ui/core'

export class SuggestCreateWarehouseForm extends Component {
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
                        <Card variant="outlined">
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Typography style={{ margin: '1rem' }}>
                                        Bạn chưa có kho, hãy tạo 1 kho mới
                                    </Typography>
                                </Grid>
                                <Grid item style={{ margin: '1rem' }}>
                                    <Link to='/warehouse/add' style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" size="medium" color="primary">Tạo kho</Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestCreateWarehouseForm)
