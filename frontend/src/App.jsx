import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Common/header';
import Footer from './components/Common/footer';
import HomePage from './pages/Landing/HomePage';
import CartPage from './pages/Cart/CartPage';
import ProductList from "./components/product_management/ProductList.jsx";
import AddProduct from "./components/product_management/AddProduct.jsx";
import UpdateProduct from "./components/product_management/UpdateProduct.jsx";
import ProductPage from "./pages/products/productCatalogue.jsx";
import AdminLayout from "./components/Common/adminPanel.jsx";
import AdminOrdersPage from './components/adminComponents/adminOrders.jsx';
import Login from "./pages/login/Login.jsx";
import Registration from "./pages/register/Registration.jsx";
import AdminOnlyRoute from './components/AdminOnlyRoute';
import UserList from './components/UserManagement/userList.jsx';
import AdminFinancials from './components/adminComponents/adminFinancials.jsx';
import Profile from './components/UserManagement/userProfile.jsx';
import AboutPage from './pages/About/AboutPage';
import DashboardAdmin from './components/Common/DashboardAdmin.jsx';
import QuotationPage from './pages/products/quotationPage.jsx';
import { Toaster } from 'react-hot-toast';

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
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1F2937',
            color: '#fff',
            border: '1px solid #4B5563',
          },
          success: {
            style: {
              background: '#059669',
            },
          },
          error: {
            style: {
              background: '#DC2626',
            },
          },
        }}
      />
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
        <Route path="/profile" element={
          <MainLayout>
            <Profile />
          </MainLayout>
        } />
        <Route path="/quotation" element={
          <MainLayout>
            <QuotationPage />
          </MainLayout>
        } />
        <Route path="/about" element={
          <MainLayout>
            <AboutPage />
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
          <Route index element={<DashboardAdmin />} />
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