import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import store from './Store';
import { Provider } from 'react-redux'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core'
import LoginForm from './components/login/login-form'
import SignupForm from './components/signup/signup-form'
import Navbar from './components/navbar'

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/home" component={Navbar} />
            

            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
