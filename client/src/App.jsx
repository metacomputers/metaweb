
//import './App.css'
import { Routes, Route } from 'react-router-dom';
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminFeatures from './pages/admin-view/features';
import AdminOrders from './pages/admin-view/orders';
import AdminProducts from './pages/admin-view/products';
import ShoppingLayout from './pages/shopping-view/layout';

function App() {

  return (
    <div>
      <div>Header component</div>
      <Routes>


        <Route path="/auth" element={<AuthLayout />}> {/*Parent Path*/}

          <Route path="login" element={<AuthLogin />} />  {/*Child Paths*/}
          <Route path="register" element={<AuthRegister />} />

        </Route>

        <Route path="/admin" element={<AdminLayout/>}>
        
            <Route path="dashboard" element={<AdminDashboard/>}/>
            <Route path="features" element={<AdminFeatures/>}/>
            <Route path="orders" element={<AdminOrders/>}/>
            <Route path="products" element={<AdminProducts/>}/>

        </Route >

                
        <Route path="/shop" element={<ShoppingLayout/>}/>
            

        


        


      </Routes>

    </div>
    
  )
}

export default App
