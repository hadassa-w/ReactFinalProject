"use client"

import { useState, useEffect } from "react"
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Button,
  Fade,
  Zoom,
  Avatar,
  Stack,
} from "@mui/material"
import {
  Restaurant,
  EmojiEvents,
  LocalDining,
  Cake,
  FreeBreakfast,
  Fastfood,
  LocalPizza,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

function Welcome() {
  const [isLoaded, setIsLoaded] = useState(false)
  const navigate = useNavigate();

  // Popular categories
  const categories = [
    { icon: <Cake />, name: "Desserts" },
    { icon: <LocalDining />, name: "Main Dishes" },
    { icon: <FreeBreakfast />, name: "Breakfast" },
    { icon: <Fastfood />, name: "Quick Meals" },
    { icon: <LocalPizza />, name: "Italian" },
  ]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
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
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
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
                  Welcome to Our <br />
                  <Box component="span" sx={{ color: "#c5cae9" }}>
                    Recipe!
                  </Box>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#fff",
                    mb: 4,
                    maxWidth: "90%",
                    lineHeight: 1.6,
                    opacity: 0.9,
                    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  We offer a variety of easy and delicious recipes completely free of charge! Our recipe website is
                  accessible to you anytime, anywhere.
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Restaurant />}
                  onClick={() => navigate("/recipes")}
                  sx={{
                    bgcolor: "#fff",
                    color: "#764ba2",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Start Cooking
                </Button>
              </Grid>

            </Grid>
          </Paper>
        </Fade>

        {/* Categories Section */}
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
            What will you find with us?
          </Typography>

          <Box
            sx={{
              width: 80,
              height: 4,
              bgcolor: "#764ba2",
              mx: "auto",
              mb: 4,
              borderRadius: 2,
            }}
          />

          <Grid container spacing={2} justifyContent="center">
            {categories.map((category, index) => (
              <Grid item xs={6} sm={4} md={2.4} key={index}>
                <Zoom in={isLoaded} timeout={(index + 1) * 200}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      height: "100%",
                      borderRadius: 4,
                      bgcolor: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                        "& .MuiAvatar-root": {
                          bgcolor: "#764ba2",
                          transform: "scale(1.1)",
                        },
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#e0e0e0",
                        color: "#424242",
                        width: 60,
                        height: 60,
                        mb: 1.5,
                        transition: "all 0.3s ease",
                      }}
                      className="MuiAvatar-root"
                    >
                      {category.icon}
                    </Avatar>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {category.name}
                    </Typography>
                  </Paper>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Benefits Section */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Fade in={isLoaded} timeout={1200}>
                <Box>
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      color: "#424242",
                    }}
                  >
                    Why Our Recipes Are Special
                  </Typography>

                  <Stack spacing={3}>
                    {[
                      {
                        icon: <EmojiEvents sx={{ color: "#ffc107" }} />,
                        title: "Award-Winning Recipes",
                        description: "Our collection includes recipes that have won culinary competitions.",
                      },
                      {
                        icon: <Restaurant sx={{ color: "#4caf50" }} />,
                        title: "Chef-Approved",
                        description: "All recipes are tested and approved by professional chefs.",
                      },
                      {
                        icon: <LocalDining sx={{ color: "#f44336" }} />,
                        title: "Easy to Follow",
                        description: "Clear instructions that make cooking enjoyable for everyone.",
                      },
                    ].map((benefit, index) => (
                      <Paper
                        key={index}
                        elevation={0}
                        sx={{
                          p: 2.5,
                          borderRadius: 3,
                          bgcolor: "#fff",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 2,
                          transition: "transform 0.3s ease",
                          "&:hover": {
                            transform: "translateX(5px)",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            bgcolor: "rgba(0,0,0,0.04)",
                            flexShrink: 0,
                          }}
                        >
                          {benefit.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {benefit.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {benefit.description}
                          </Typography>
                        </Box>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
              <Fade in={isLoaded} timeout={1400}>
                <Box
                  sx={{
                    position: "relative",
                    height: "100%",
                    minHeight: 400,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >

                  {/* Decorative elements */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "10%",
                      left: "5%",
                      width: "70%",
                      height: "70%",
                      borderRadius: 4,
                      border: "2px dashed #764ba2",
                      opacity: 0.3,
                      zIndex: 0,
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "10%",
                      right: "5%",
                      width: "70%",
                      height: "70%",
                      borderRadius: 4,
                      border: "2px dashed #764ba2",
                      opacity: 0.3,
                      zIndex: 0,
                    }}
                  />
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Box>

        {/* Call to Action */}
        <Fade in={isLoaded} timeout={1500}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 700,
                color: "#fff",
                mb: 2,
                textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
              }}
            >
              Good Luck and Enjoy Your Meal!
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                mb: 4,
                maxWidth: 700,
                mx: "auto",
                opacity: 0.9,
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              Start your culinary journey today and discover the joy of cooking with our easy-to-follow recipes.
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<Restaurant />}
              onClick={() => navigate("/recipes")}
              sx={{
                bgcolor: "#fff",
                color: "#764ba2",
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Get Started Now
            </Button>
          </Paper>
        </Fade>
      <br/>
      <br/>
      <Typography >© All rights reserved.</Typography>
      </Container>
    </Box>
  )
}

export default Welcome
