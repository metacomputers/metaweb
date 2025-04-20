import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList.jsx";
import AddProduct from "./components/AddProduct.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";
import Home from "./pages/home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/updateproduct/:id" element={<UpdateProduct />} />        
        <Route path="/home" element={<Home />} />        

      </Routes>
    </Router>
  );
}

export default App;
