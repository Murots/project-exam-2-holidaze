// import "./App.css";
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/layout/Layout";
// import HomePage from "./pages/home-page/HomePage.jsx";
// import VenuesPage from "./pages/venues-page/VenuesPage.jsx";
// import DetailsPage from "./pages/details-page/DetailsPage";

// function App() {
//   return (
//     <Layout>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/venues" element={<VenuesPage />} />
//         <Route path="/venues/:id" element={<DetailsPage />} />
//       </Routes>
//     </Layout>
//   );
// }

// export default App;
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/home-page/HomePage";
import VenuesPage from "./pages/venues-page/VenuesPage";
import DetailsPage from "./pages/details-page/DetailsPage";
import MyBookingsPage from "./pages/my-bookings-page/MyBookingsPage";
import MyAccountPage from "./pages/my-account-page/MyAccountPage";
import CreateVenuePage from "./pages/create-venue-page/CreateVenuePage";
// import MyVenuesPage from "./pages/my-venues-page/MyVenuesPage";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/venues/:id" element={<DetailsPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/my-account" element={<MyAccountPage />} />
          {/* <Route path="/my-venues" element={<MyVenuesPage />} /> */}
          <Route path="/create-venue" element={<CreateVenuePage />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
