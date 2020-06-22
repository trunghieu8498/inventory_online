import React, { Component } from 'react'
//import logo from './logo.svg';
//import './App.css';
import store from './Store'
import { Provider, connect } from 'react-redux'
import { BrowserRouter, Redirect } from 'react-router-dom'
import Navbar from './components/main/navbar'
import { Switch, Route } from 'react-router-dom'
import Sidebar from './components/main/sidebar'
import LoginForm from './components/login/login-form'
import SignupForm from './components/signup/signup-form'
import { Grid } from '@material-ui/core'
import createReactClass from 'create-react-class'
// import Homepage from './components/home/home-page'
import WarehouseTable from './components/warehouse/warehouse-table'
import AddWarehouseForm from './components/warehouse/addWarehouse-form'
import { loadCustomer } from './actions/auth-action'
import GoodsTable from './components/goods/goods-table'
import TypeTable from './components/type/type-table'
import DeliveryNoteTable from './components/deliverynote/deliveryNote-table'
import ReceivedNoteTable from './components/receivednote/receivednote-table'
import AddTypeForm from './components/type/addType-form'
import AddGoodsForm from './components/goods/addGoods-form'
import AddReceivedNoteForm from './components/receivednote/receivednote-form'
import AddDeliveryNoteForm from './components/deliverynote/deliverynote-form'
import { loadWarehouse } from './actions/warehouse-action'
class App extends Component {

  componentDidMount() {
    store.dispatch(loadCustomer())
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
        <BrowserRouter>
          <Navbar />
          <div style={{ margin: '2rem' }}>
            <Switch>
              <Redirect exact from='/' to='/login' />
              <Route exact path='/login' component={LoginForm} />
              <Route eaxct path='/signup' component={SignupForm} />
              <Route exact path='/warehouse' component={() => Page(WarehouseTable)} />
              <Route exact path='/warehouse/add' component={() => Page(AddWarehouseForm)} />
              <Route exact path='/goods' component={() => Page(GoodsTable)} />
              <Route exact path='/type' component={() => Page(TypeTable)} />
              <Route exact path='/type/add' component={() => Page(AddTypeForm)} />
              <Route exact path='/deliverynote' component={() => Page(DeliveryNoteTable)} />
              <Route exact path='/receivednote' component={() => Page(ReceivedNoteTable)} />
              <Route exact path='/goods/add' component={() => Page(AddGoodsForm)} />
              <Route exact path='/receivednote/add' component={() => Page(AddReceivedNoteForm)} />
              <Route exact path='/deliverynote/add' component={() => Page(AddDeliveryNoteForm)} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
