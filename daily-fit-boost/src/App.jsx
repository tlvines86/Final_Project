import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <main className="app__content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
