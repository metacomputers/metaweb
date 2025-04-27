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
import AdminLayout from "./components/Common/adminPanel.jsx";
import AdminOrdersPage from './components/adminComponents/adminOrders.jsx';
import AdminFinancials from './components/adminComponents/adminFinancials.jsx';
import Login from "./pages/login/Login.jsx";
import Registration from "./pages/register/Registration.jsx";
import AdminOnlyRoute from './components/AdminOnlyRoute';
import UserList from './components/UserManagement/userList.jsx';

// Layout component for non-admin routes
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes with header and footer */}
        <Route path="/" element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        } />
        <Route path="/cart" element={
          <MainLayout>
            <CartPage />
          </MainLayout>
        } />
        <Route path="/products" element={
          <MainLayout>
            <ProductPage />
          </MainLayout>
        } />
        <Route path="/user/orders" element={
          <MainLayout>
            <UserOrdersPage />
          </MainLayout>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        
        {/* Admin routes - without header and footer */}
        <Route path="/admin" element={
          <AdminOnlyRoute>
            <AdminLayout />
          </AdminOnlyRoute>
        }>
          <Route index element={<AdminOrdersPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="products" element={<ProductList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="updateproduct/:id" element={<UpdateProduct />} />
          <Route path="users" element={<UserList />} />
          <Route path="financials" element={<AdminFinancials />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;