import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Paper, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createCompany, updateCompany } from "../actions/companyActions";

const CompanyForm = ({ company }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const { loading } = useSelector((state) => state.company);

  useEffect(() => {
    if (company) {
      setName(company.name || "");
      setDescription(company.description || "");
      setLocation(company.location || "");
    }
  }, [company]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const companyData = { name, description, location };

    if (company?._id) {
      dispatch(updateCompany(company._id, companyData));
    } else {
      dispatch(createCompany(companyData));
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {company ? "Edit Company" : "Create Company"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Company Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {company ? "Update Company" : "Create Company"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default CompanyForm;
