import React, { Component } from 'react'
//import logo from './logo.svg';
//import './App.css';
import store from './Store'
import { Provider, connect } from 'react-redux'
import { BrowserRouter, Redirect } from 'react-router-dom'
import Navbar from './components/main/navbar'
// import Page from './components/main/page'
import { Switch, Route } from 'react-router-dom'
import Sidebar from './components/main/sidebar'
import LoginForm from './components/login/login-form'
import SignupForm from './components/signup/signup-form'
import { Grid } from '@material-ui/core'
import createReactClass from 'create-react-class'
import Homepage from './components/home/home-page'
import WarehouseTable from './components/warehouse/warehouse-table'
import AddWarehouseForm from './components/warehouse/addWarehouse-form'
import { loadCustomer } from './actions/auth-action'

class App extends Component {

  componentDidMount() {
    store.dispatch(loadCustomer());
  }


  render() {
    const Page = (Content) => (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={9}>
            <Content />
          </Grid>
        </Grid>
      </div>
    )

    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <Navbar />
            <div style={{ margin: '2rem' }}>
              <Switch>
                <Redirect exact from='/' to='/login' />

                <Route exact path='/login' component={LoginForm} />
                <Route eaxct path='/signup' component={SignupForm} />
                <Route exact path='/warehouse' component={() => Page(WarehouseTable)} />
                <Route exact path='/warehouse/add' component={() => Page(AddWarehouseForm)} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    )
  }
}

export default App
