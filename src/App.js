import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/home-page/HomePage.jsx";
import VenuesPage from "./pages/venues-page/VenuesPage.jsx";
import DetailsPage from "./pages/details-page/DetailsPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/venues" element={<VenuesPage />} />
        <Route path="/venues/:id" element={<DetailsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
