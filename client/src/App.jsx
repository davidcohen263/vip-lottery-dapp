import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LotteryPage from "./pages/LotteryPage"; // ייבוא הדף של ההגרלה

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lottery/:id" element={<LotteryPage />} /> {/* תומך בלחיצה על הגרלה */}
    </Routes>
  </Router>
);

export default App;
