import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch} from 'react-router-dom'
import LoginForm from '../login/login-form'
import SignupForm from '../signup/signup-form'
import Sidebar from './sidebar'
import Homepage from '../home/home-page'

export class Page extends Component {
    render() {

        return (
            <div>
                <Switch>
                    <Route path='/login' component={LoginForm}/>
                    <Route path='/signup' component={SignupForm}/>
                    <Route path='/home' component={Homepage}/>

                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
