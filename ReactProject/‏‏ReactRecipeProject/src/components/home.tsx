import { useState, useEffect } from "react"
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Button,
  Fade,
  Grow,
} from "@mui/material"
import { RestaurantMenu, Favorite, AccessTime, TrendingUp } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #f8f9fa 100%)",
        minHeight: "100vh",
        pt: 4,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Fade in={isLoaded} timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              mb: 6,
              borderRadius: 4,
              background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    color: "#fff",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                    mb: 2,
                    lineHeight: 1.2,
                  }}
                >
                  Delicious Recipes <br />
                  <Box component="span" sx={{ color: "#5c2018" }}>
                    For Every Taste!
                  </Box>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#fff",
                    mb: 4,
                    maxWidth: "90%",
                    lineHeight: 1.6,
                    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  Discover a world of easy and delicious recipes, available for free, anytime you need culinary
                  inspiration.
                </Typography>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/login")}
                    sx={{
                      borderColor: "#fff",
                      color: "#fff",
                      fontWeight: "bold",
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      "&:hover": {
                        borderColor: "#fff",
                        bgcolor: "rgba(255,255,255,0.1)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Sign Up Free
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/login")}
                    sx={{
                      borderColor: "#fff",
                      color: "#fff",
                      fontWeight: "bold",
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      "&:hover": {
                        borderColor: "#fff",
                        bgcolor: "rgba(255,255,255,0.1)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Sign In Free
                  </Button>
                </Box>
              </Grid>
            </Grid>

            {/* Decorative elements */}
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -30,
                left: -30,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                zIndex: 0,
              }}
            />
          </Paper>
        </Fade>

        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: "#424242",
            }}
          >
            Why Choose Our Recipes?
          </Typography>

          <Box
            sx={{
              width: 80,
              height: 4,
              bgcolor: "#ff9a9e",
              mx: "auto",
              mb: 4,
              borderRadius: 2,
            }}
          />

          <Grid container spacing={3} justifyContent="center">
            {[
              {
                icon: <RestaurantMenu fontSize="large" sx={{ color: "#ff7043" }} />,
                title: "Easy to Follow",
                description: "Step-by-step instructions that make cooking simple for everyone.",
              },
              {
                icon: <AccessTime fontSize="large" sx={{ color: "#42a5f5" }} />,
                title: "Quick Preparation",
                description: "Recipes designed for busy people who still want delicious meals.",
              },
              {
                icon: <Favorite fontSize="large" sx={{ color: "#ec407a" }} />,
                title: "Healthy Options",
                description: "Nutritious recipes that don't compromise on taste.",
              },
              {
                icon: <TrendingUp fontSize="large" sx={{ color: "#66bb6a" }} />,
                title: "Trending Recipes",
                description: "Stay updated with the latest food trends and seasonal favorites.",
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in={isLoaded} timeout={(index + 1) * 300}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: "100%",
                      borderRadius: 4,
                      bgcolor: "#fff",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 70,
                          height: 70,
                          borderRadius: "50%",
                          bgcolor: "rgba(0,0,0,0.04)",
                          mb: 2,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Box>
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Typography >© All rights reserved.</Typography>
      </Container>
    </Box>
  )
}

export default Home
