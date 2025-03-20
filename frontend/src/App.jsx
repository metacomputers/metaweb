import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProductList from "./pages/Admin/ProductList";
import DeliveryList from "./pages/Admin/DeliveryList";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<DeliveryList />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/deliveries" element={<DeliveryList />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
