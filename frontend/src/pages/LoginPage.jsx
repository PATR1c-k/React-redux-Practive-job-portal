import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/seeker/dashboard");
      }
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
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
        elevation={1}
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
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Log in to continue to your dashboard
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
              label="Email Address"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                background: "linear-gradient(to right, #1976d2, #42a5f5)",
                fontWeight: "bold",
                ":hover": {
                  background: "linear-gradient(to right, #1565c0, #2196f3)",
                },
              }}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
