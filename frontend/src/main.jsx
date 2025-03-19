import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import "./index.css"

import ProductList from "./pages/Admin/ProductList.jsx";

// Admin Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/admin' element={<AdminRoute />}>
      <Route path='/productlist' element={<ProductList />} />

    </Route>
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  //<Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  //</Provider>
);
