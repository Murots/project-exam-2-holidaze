import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/home-page/HomePage.jsx";
import VenuesPage from "./pages/venues-page/VenuesPage.jsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/venues" element={<VenuesPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
