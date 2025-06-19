import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/Hearder.jsx";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EmployerDashboard from "./pages/EmployerDashboard";
import SeekerDashboard from "./pages/SeekerDashboard";
import CompanyProfilePage from "./pages/CompanyProfilePage";
import JobCreatePage from "./pages/JobCreatePage";
import JobListPage from "./pages/JobListPage";
import ApplicationsPage from "./pages/ApplicationsPage";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/employer/dashboard"
          element={
            <PrivateRoute>
              <EmployerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/seeker/dashboard"
          element={
            <PrivateRoute>
              <SeekerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/company/profile"
          element={
            <PrivateRoute>
              <CompanyProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/job/create"
          element={
            <PrivateRoute>
              <JobCreatePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <JobListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <PrivateRoute>
              <ApplicationsPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
