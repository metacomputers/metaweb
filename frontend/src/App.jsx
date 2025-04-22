import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/product_management/ProductList.jsx";
import AddProduct from "./components/product_management/AddProduct.jsx";
import UpdateProduct from "./components/product_management/UpdateProduct.jsx";
import ProductPage from "./pages/products/productCatalogue.jsx";
import AdminLayout from "./components/common/AdminPanel.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/updateproduct/:id" element={<UpdateProduct />} />
        <Route path="/products" element={<ProductPage />} />

      </Routes>
    </Router>
  );
}

export default App;
