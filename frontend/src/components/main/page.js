import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import LoginForm from '../login/login-form'
import SignupForm from '../signup/signup-form'
import Sidebar from './sidebar'
import Homepage from '../home/home-page'
import WarehousePage from '../warehouse/warehouse-page'

export class Page extends Component {
    render() {

        return (
            <div></div>

            // <div style={{ margin: '1rem' }}>
            //     <Switch>
            //         <Route path='/login' component={LoginForm} />
            //         <Route path='/signup' component={SignupForm} />
            //         <Route path='/home' component={Homepage} />
            //         <Route path='/warehouse' component={WarehousePage} />
            //     </Switch>
            // </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
