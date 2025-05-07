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
  CircularProgress,
  Paper,
  Container,
  Grid,
  Alert,
  Divider,
  InputAdornment,
  IconButton,
  Fade,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material"
import {
  Person,
  Email,
  Phone,
  Badge,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowBack,
  ArrowForward,
  Login as LoginIcon,
} from "@mui/icons-material"

function Register() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [tz, setTz] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { setIsLoggedIn } = useAuth()

  // Form validation states
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    name: "",
    phone: "",
    email: "",
    tz: "",
  })

  const validateEmail = (email:string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone:string) => {
    const re = /^[0-9]{10}$/
    return re.test(phone)
  }

  const validateStep = (step:any) => {
    let isValid = true
    const newErrors = { ...errors }

    if (step === 0) {
      if (!name) {
        newErrors.name = "Name is required"
        isValid = false
      } else {
        newErrors.name = ""
      }

      if (!email) {
        newErrors.email = "Email is required"
        isValid = false
      } else if (!validateEmail(email)) {
        newErrors.email = "Please enter a valid email"
        isValid = false
      } else {
        newErrors.email = ""
      }

      if (!phone) {
        newErrors.phone = "Phone is required"
        isValid = false
      } else if (!validatePhone(phone)) {
        newErrors.phone = "Please enter a valid 10-digit phone number"
        isValid = false
      } else {
        newErrors.phone = ""
      }

      if (!tz) {
        newErrors.tz = "ID number is required"
        isValid = false
      } else {
        newErrors.tz = ""
      }
    } else if (step === 1) {
      if (!username) {
        newErrors.username = "Username is required"
        isValid = false
      } else {
        newErrors.username = ""
      }

      if (!password) {
        newErrors.password = "Password is required"
        isValid = false
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters"
        isValid = false
      } else {
        newErrors.password = ""
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleRegister = async () => {
    if (!validateStep(1)) {
      return
    }

    const requestData = {
      UserName: username,
      Password: password,
      Name: name,
      Phone: phone,
      Email: email,
      Tz: tz,
    }
    setLoading(true)

    try {
      console.log("Sending registration request with:", requestData)
      const response = await axios.post("http://localhost:8080/api/user/sighin", requestData)
      console.log("Received response:", response)
      if (response.status === 200) {
        console.log("Registration successful:", response.data)
        setIsLoggedIn(true)
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userId", response.data.Id)
        navigate("/wellcome")
      } else {
        console.log("Registration failed with status:", response.status)
        setError("Registration failed. Please check your details.")
      }
    } catch (error) {
      console.error("Error registering:", error)
      setError("Registration failed. Please check your details and try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    navigate("/logIn")
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const steps = ["Personal Information", "Account Details"]

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
            Create Account 🎉
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel sx={{ width: "100%", mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 3 }}>
              {error}
            </Alert>
          )}

          {activeStep === 0 ? (
            <Box sx={{ width: "100%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    required
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    type="email"
                    required
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    required
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="ID Number"
                    required
                    fullWidth
                    value={tz}
                    onChange={(e) => setTz(e.target.value)}
                    error={!!errors.tz}
                    helperText={errors.tz}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Badge color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={handleNext}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                    backgroundColor: "#5c6bc0",
                    "&:hover": {
                      backgroundColor: "#3f51b5",
                    },
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ width: "100%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    required
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    required
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={handleBack}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleRegister}
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                    backgroundColor: "#5c6bc0",
                    "&:hover": {
                      backgroundColor: "#3f51b5",
                    },
                  }}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={24} sx={{ color: "white", mr: 1 }} /> Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </Box>
            </Box>
          )}

          <Divider sx={{ width: "100%", my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={handleLogin}
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
            Already have an account? Sign in
          </Button>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: "center" }}>
            By registering, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </Paper>
      </Fade>
    </Container>
  )
}

export default Register
