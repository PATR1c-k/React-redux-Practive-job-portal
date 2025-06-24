// src/pages/EmployerDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyDetails } from "../actions/companyActions";
import CompanyForm from "../components/CompanyForm";
import JobList from "../components/JobList";

const EmployerDashboard = () => {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);

  const { company, loading, error } = useSelector((state) => state.company);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(getCompanyDetails());
    }
  }, [dispatch, userInfo]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Employer Dashboard
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : company ? (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6">{company.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {company.description}
          </Typography>
          <Typography variant="body2">{company.location}</Typography>

          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Edit Company"}
          </Button>

          {showForm && <CompanyForm company={company} />}
        </Paper>
      ) : (
        <>
          {error && (
            <Typography color="error" gutterBottom>
              Error: {error}
            </Typography>
          )}
          <Typography variant="body1" gutterBottom>
            No company profile found. Please create your company.
          </Typography>
          <CompanyForm />
        </>
      )}

      {/* Job List Section */}
      <JobList />
    </Box>
  );
};

export default EmployerDashboard;
