import React from 'react'
//import logo from './logo.svg';
//import './App.css';
import store from './Store'
import { Provider } from 'react-redux'
import { BrowserRouter} from 'react-router-dom'
import Navbar from './components/main/navbar'
import Page from './components/main/page'

function App() {

  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Navbar/>
          <Page style={{marginTop: '4rem'}}/>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App
