// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import "./index.css"
import {Route, RouterProvider, createRoutesFromElements} from 'react-router-dom'
import { createBrowserRouter } from 'react-router';
import{Provider} from 'react-redux'
import store from './redux/features/store.js'


//Auth
import Login from './pages/Auth/login.jsx';


const router = createBrowserRouter (
  createRoutesFromElements (
    <Route path = '/' element = {<App />}>
        <Route path = '/login' element = {<Login />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store} >
    <RouterProvider router = {router}/>
  </Provider>
  
)
