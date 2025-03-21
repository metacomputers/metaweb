import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Registration from "./pages/register/Registration.jsx";
// import User from './pages/users/User.jsx';
import UserList from "./components/UserManagement/userList.jsx";

const App = () => {
  return (
    // <BrowserRouter>
    //     <Routes>
    //         {/* Authentication Routes */}
    //         <Route path="/" element={<Login />} />
    //         <Route path="/register" element={<Registration />} />
    //         <Route path="/users" element={<User />} />
    //     </Routes>
    // </BrowserRouter>
    <div>
      <UserList/>
    </div>
  );
};

export default App;
