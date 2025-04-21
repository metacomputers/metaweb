import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/HeaderFooter/Header';
import Footer from './components/HeaderFooter/Footer';
import HomePage from './pages/Landing/HomePage';
import CartPage from './pages/Cart/CartPage';
import UserOrdersPage from './pages/Orders/UserOrdersPage';

function App() {
  return (
    <Router>
      <Header />
      <main className="min-h-screen pt-24"> {/* Added padding-top for fixed header */}
        <Routes>
          <Route path="/cart" element={<CartPage />} />
          <Route path="user/orders" element={<UserOrdersPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
      <Footer /> 
    </Router>
  );
}

export default App;