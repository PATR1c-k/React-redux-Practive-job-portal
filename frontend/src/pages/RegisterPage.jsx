import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  MenuItem,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/authActions";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("seeker");
  const [password, setPassword] = useState("");

  const { loading, error, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password, role }));
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Paper
        sx={{
          p: 4,
          border: ".8px dashed black",
          borderRadius: 3,
          width: "100%",
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              mb: 1,
            }}
          >
            Register
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join and start your career journey
          </Typography>
        </Box>

        {loading && <Loader />}
        {error && (
          <Typography variant="body2" color="error" gutterBottom>
            {error}
          </Typography>
        )}

        <form onSubmit={submitHandler}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Role"
              variant="outlined"
              select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
              required
            >
              <MenuItem value="employer">Employer</MenuItem>
              <MenuItem value="seeker">Job Seeker</MenuItem>
            </TextField>

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                fontWeight: "bold",
                letterSpacing: 0.5,
              }}
            >
              Register
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
