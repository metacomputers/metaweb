import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Registration from "./pages/register/Registration.jsx";
import AdminLayout from "./components/Common/adminPanel.jsx";
import UserList from "./components/UserManagement/userList.jsx";
import Profile from "./components/UserManagement/userProfile.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
  return (

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<UserList />} />
          {/* You can add more nested admin routes here, like: */}
          {/* <Route path="add-product" element={<AddProduct />} /> */}
        </Route>
      </Routes>
  );
};

export default App;
