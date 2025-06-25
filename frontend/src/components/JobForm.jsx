import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../actions/jobActions";

const JobForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.jobCreate);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createJob({ title, description, requirements, salary }));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Post a New Job
      </Typography>

      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Job Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Requirements"
              fullWidth
              multiline
              rows={2}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Salary (e.g. 6-8 LPA)"
              fullWidth
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default JobForm;
