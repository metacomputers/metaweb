import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/Landing/HomePage';
import CartPage from './pages/Cart/CartPage';
import UserOrdersPage from './pages/Orders/UserOrdersPage';
import ProductList from "./components/product_management/ProductList.jsx";
import AddProduct from "./components/product_management/AddProduct.jsx";
import UpdateProduct from "./components/product_management/UpdateProduct.jsx";
import ProductPage from "./pages/products/productCatalogue.jsx";
import AdminLayout from "./components/common/AdminPanel.jsx";
import AdminOrdersPage from './components/adminComponents/adminOrders.jsx';

function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="user/orders" element={<UserOrdersPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
         
          
          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/add-product" element={<ProductList />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/products" element={<ProductPage />} />
          
        </Routes>
      </main>
      <Footer /> 
    </Router>
  );
}

export default App
