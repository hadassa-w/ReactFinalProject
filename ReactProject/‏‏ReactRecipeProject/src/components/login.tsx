"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../context/authContext"
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
  Paper,
  Container,
  Divider,
  Alert,
  Fade,
} from "@mui/material"
import { Visibility, VisibilityOff, Login as LoginIcon, PersonAdd } from "@mui/icons-material"

function LogIn() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { setIsLoggedIn } = useAuth()

  const handleLogin = async () => {
    // Form validation
    if (!username || !password) {
      setError("Please enter both username and password")
      return
    }

    const requestData = {
      UserName: username,
      Password: password,
    }
    setLoading(true)

    try {
      console.log("Sending login request with:", { username, password })
      const response = await axios.post("http://localhost:8080/api/user/login", requestData)

      console.log("Received response:", response)
      if (response.status === 200) {
        const user = response.data
        console.log("Login successful:", user)
        setIsLoggedIn(true)
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userId", user.Id)
        navigate("/wellcome")
      } else {
        console.log("Login failed with status:", response.status)
        setError("Login failed. Please check your credentials.")
      }
    } catch (error) {
      console.error("Error logging in:", error)
      setError("The username or password is incorrect. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = () => {
    navigate("/register")
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleKeyDown = (e:any) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  return (
    <Container maxWidth="sm">
      <Fade in={true} timeout={800}>
        <Paper
          elevation={3}
          sx={{
            mt: 8,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
            Welcome Back! 🎉
          </Typography>

          <Box sx={{ width: "100%", mb: 3 }}>
            <TextField
              label="Username"
              required
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LoginIcon color="action" />
                  </InputAdornment>
                ),
              }}
              onKeyDown={handleKeyDown}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              required
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onKeyDown={handleKeyDown}
            />
          </Box>

          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              py: 1.5,
              mb: 2,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              backgroundColor: "#5c6bc0",
              "&:hover": {
                backgroundColor: "#3f51b5",
              },
              boxShadow: 2,
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={24} sx={{ color: "white", mr: 1 }} /> Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          <Divider sx={{ width: "100%", my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<PersonAdd />}
            onClick={handleRegister}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              borderColor: "#9c27b0",
              color: "#9c27b0",
              "&:hover": {
                borderColor: "#7b1fa2",
                backgroundColor: "rgba(156, 39, 176, 0.04)",
              },
            }}
          >
            Create a new account
          </Button>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: "center" }}>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </Paper>
      </Fade>
    </Container>
  )
}

export default LogIn
