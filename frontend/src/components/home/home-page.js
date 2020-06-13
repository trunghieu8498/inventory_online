import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Grid} from '@material-ui/core'
import Sidebar from '../main/sidebar'
import HomeContent from './home-content'

export class Homepage extends Component {
    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Sidebar />
                    </Grid>
                    <Grid item xs>
                        <HomeContent />
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
