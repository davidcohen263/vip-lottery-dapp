import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LotteryPage from "./pages/LotteryPage";
import UserDashboard from "./pages/UserDashboard";
import AdminPanel from "./pages/AdminPanel";
import Layout from "./components/Layout";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/lottery/:id" element={<Layout><LotteryPage /></Layout>} />
      <Route path="/dashboard" element={<Layout><UserDashboard /></Layout>} />
      <Route path="/admin" element={<Layout><AdminPanel /></Layout>} />
    </Routes>
  </Router>
);

export default App;
