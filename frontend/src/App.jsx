import Maintenance from "./pages/maintenance/Maintenance.jsx";
import Repair from "./pages/maintenance/repair/Repair.jsx";
import Consult from "./pages/maintenance/consult/Consult.jsx";
import Login from "./pages/login/Login.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/admin/Home.jsx";
import ManageRepair from "./pages/admin/maintenance/repair/ManageRepair.jsx";
import MangeConsult from "./pages/admin/maintenance/consult/MangeConsult.js";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin" element={<Home />} />
                <Route path="/admin/repair" element={<ManageRepair />} />
                <Route path="/admin/consult" element={<MangeConsult />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/maintenance/repair" element={<Repair />} />
                <Route path="/maintenance/consult" element={<Consult />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
