import React, { useEffect } from "react";
import {
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { listEmployerJobs } from "../actions/jobActions";

const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobList);

  useEffect(() => {
    dispatch(listEmployerJobs());
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Posted Jobs
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : jobs.length === 0 ? (
        <Typography>No jobs posted yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid item xs={12} md={6} key={job._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Salary: {job.salary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default JobList;
