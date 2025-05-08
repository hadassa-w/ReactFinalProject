import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  MenuItem,
  Container,
  InputAdornment,
  IconButton,
  Paper,
  Fade,
  Collapse,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  alpha,
  Avatar,
  Tooltip,
  Badge
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SpeedIcon from "@mui/icons-material/Speed";
import CategoryIcon from "@mui/icons-material/Category";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import CloseIcon from "@mui/icons-material/Close";
import Recipe from "../modules/recipe";

interface Category {
  Id: number;
  Name: string;
}

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Show content with fade-in effect
    setTimeout(() => setFadeIn(true), 100);
    
    const fetchData = async () => {
      try {
        const [recipesRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:8080/api/recipe"),
          axios.get("http://localhost:8080/api/category"),
        ]);
        const sortedRecipes = recipesRes.data.sort(
          (a: Recipe, b: Recipe) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
        );
        setRecipes(sortedRecipes);
        setFilteredRecipes(sortedRecipes);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load recipes or categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...recipes];

    // Filter by search query (search in name and description)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        r => r.Name?.toLowerCase().includes(query) || 
             r.Description?.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(r => r.Categoryid?.toString() === categoryFilter);
    }
    
    // Filter by duration
    if (durationFilter) {
      filtered = filtered.filter(r => r.Duration?.toString().trim() === durationFilter);
    }

    // Filter by difficulty
    if (difficultyFilter) {
      filtered = filtered.filter(r => r.Difficulty?.toLowerCase() === difficultyFilter.toLowerCase());
    }

    setFilteredRecipes(filtered);
  }, [categoryFilter, durationFilter, difficultyFilter, searchQuery, recipes]);

  const uniqueValues = (field: keyof Recipe) => {
    return [...new Set(
      recipes
        .map(r => r[field])
        .filter(Boolean)
        .map(val => typeof val === "string" ? val.trim() : val?.toString())
    )];
  };

  const getCategoryName = (categoryId: number): string => {
    return categories.find(category => category.Id === categoryId)?.Name || "Unknown";
  };

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: "auto",
      },
    },
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleExpand = (id: number) => {
    setExpandedRecipe(expandedRecipe === id ? null : id);
  };
  
  const resetFilters = () => {
    setCategoryFilter("");
    setDurationFilter("");
    setDifficultyFilter("");
    setSearchQuery("");
  };

  const getActiveFiltersCount = () => {
    return [categoryFilter, durationFilter, difficultyFilter].filter(Boolean).length;
  };

  if (loading) {
    return (
      <Box 
        sx={{
          height: "70vh",
          display: "flex", 
          flexDirection: "column",
          justifyContent: "center", 
          alignItems: "center"
        }}
      >
        <CircularProgress 
          size={60} 
          thickness={4} 
          sx={{ 
            color: "secondary.main",
            animation: "pulse 1.5s ease-in-out infinite",
            '@keyframes pulse': {
              '0%': {
                opacity: 1,
              },
              '50%': {
                opacity: 0.5,
              },
              '100%': {
                opacity: 1,
              },
            },
          }} 
        />
        <Typography variant="h6" mt={3} fontWeight="500" color="text.secondary">
          Discovering delicious recipes...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        sx={{
          textAlign: "center", 
          mt: 8,
          p: 4,
          borderRadius: 2,
          backgroundColor: alpha('#ff6b6b', 0.1),
        }}
      >
        <Typography color="error" variant="h5" gutterBottom>
          Oops! Something went wrong
        </Typography>
        <Typography color="text.secondary">
          {error}
        </Typography>
        <Button 
          variant="outlined" 
          color="inherit" 
          sx={{ mt: 3,  textTransform: "none"          }}
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Fade in={fadeIn} timeout={800}>
      <Container>
        {/* Header */}
        <Box 
          sx={{
            mb: 6,
            pb: 2,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: isMobile ? 2 : 0 }}>
            <LocalDiningIcon 
              sx={{ 
                fontSize: 40, 
                mr: 2, 
                color: 'secondary.main',
                transform: 'rotate(-5deg)'
              }} 
            />
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                backgroundImage: 'linear-gradient(45deg, #9c27b0, #ff9800)',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitBackgroundClip: 'text',
                letterSpacing: '0.5px'
              }}
            >
              Recipe Explorer
            </Typography>
          </Box>
        </Box>

        {/* Search and Filter Bar */}
        <Box sx={{ mb: 4 }}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2, 
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.7),
              backdropFilter: 'blur(8px)',
              width: '100%',
              // minWidth:"800px"
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: searchQuery && (
                      <InputAdornment position="end">
                        <IconButton 
                          size="small" 
                          onClick={() => setSearchQuery("")}
                          sx={{ opacity: 0.7 }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { 
                      borderRadius: 4,
                      backgroundColor: alpha(theme.palette.background.paper, 0.6),
                    }
                  }}
                  variant="outlined"
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                      },
                      '&:hover fieldset': {
                        borderColor: alpha(theme.palette.primary.main, 0.5),
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                  <Badge 
                    badgeContent={getActiveFiltersCount()} 
                    color="primary"
                    invisible={getActiveFiltersCount() === 0}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={toggleFilters}
                      startIcon={<FilterListIcon />}
                      endIcon={showFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      sx={{ 
                        borderRadius: 3,
                        textTransform: 'none',
                        fontWeight: 500,
                        px: 2,
                      }}
                    >
                      {showFilters ? "Hide Filters" : "Show Filters"}
                    </Button>
                  </Badge>
                  
                  {getActiveFiltersCount() > 0 && (
                    <Button
                      variant="text"
                      color="secondary"
                      onClick={resetFilters}
                      sx={{ 
                        ml: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                      }}
                    >
                      Clear All
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>

            {/* Expandable Filters */}
            <Collapse in={showFilters}>
              <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.3)}` }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      select
                      fullWidth
                      label="Category"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      SelectProps={{ MenuProps: menuProps }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CategoryIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      size="small"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="">All Categories</MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat.Id} value={cat.Id.toString()}>
                          {cat.Name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      select
                      fullWidth
                      label="Duration"
                      value={durationFilter}
                      onChange={(e) => setDurationFilter(e.target.value)}
                      SelectProps={{ MenuProps: menuProps }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccessTimeIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      size="small"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="">All Durations</MenuItem>
                      {uniqueValues("Duration").map((duration) => (
                        <MenuItem key={duration} value={duration}>{duration}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      select
                      fullWidth
                      label="Difficulty"
                      value={difficultyFilter}
                      onChange={(e) => setDifficultyFilter(e.target.value)}
                      SelectProps={{ MenuProps: menuProps }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SpeedIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      size="small"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="">All Difficulties</MenuItem>
                      {uniqueValues("Difficulty").map((level) => (
                        <MenuItem key={level} value={level}>{level}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </Paper>
        </Box>

        {/* Results Summary */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, px: 1 }}>
        </Box>

        {/* Recipe Grid */}
        {filteredRecipes.length === 0 ? (
          <Box 
            sx={{ 
              textAlign: "center", 
              mt: 6,
              p: 4, 
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.7),
            }}
          >
            <RestaurantMenuIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5 }} />
            <Typography variant="h6" mt={2} color="text.secondary">
              No recipes match your search criteria
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredRecipes.map((recipe) => {
              const isExpanded = expandedRecipe === recipe.Id;
              
              return (
                <Grid item xs={12} sm={6} md={isTablet ? 6 : 4} key={recipe.Id}>
                  <Card
                    sx={{
                      // height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.3s',
                      boxShadow: isExpanded 
                        ? '0 12px 28px rgba(0, 0, 0, 0.2)' 
                        : '0 4px 12px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)'
                      },
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    onClick={() => toggleExpand(recipe.Id)}
                  >
                    {/* Category badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 2,
                      }}
                    >
                      <Chip
                        icon={<CategoryIcon />}
                        label={getCategoryName(recipe.Categoryid)}
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.85)',
                          backdropFilter: 'blur(4px)',
                          fontWeight: 600,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          '& .MuiChip-icon': {
                            color: 'secondary.main'
                          }
                        }}
                      />
                    </Box>

                    {/* Recipe image with gradient overlay */}
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={recipe.Img || "https://source.unsplash.com/random/?food"}
                        alt={recipe.Name}
                        sx={{
                          objectFit: 'cover'
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '50%',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)'
                        }}
                      />
                      <Typography
                        variant="h5"
                        sx={{
                          position: 'absolute',
                          bottom: 16,
                          left: 16,
                          right: 16,
                          color: 'white',
                          fontWeight: 700,
                          textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {recipe.Name}
                      </Typography>
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      {/* Description */}
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: isExpanded ? 'none' : 3,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {recipe.Description}
                      </Typography>

                      {/* Recipe indicators */}
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        mb: 2 
                      }}>
                        <Chip
                          icon={<SpeedIcon fontSize="small" />}
                          label={recipe.Difficulty || "Easy"}
                          variant="outlined"
                          size="small"
                          sx={{
                            borderColor: 'primary.light',
                            color: 'primary.main',
                            '& .MuiChip-icon': {
                              color: 'primary.main'
                            }
                          }}
                        />
                        <Chip
                          icon={<AccessTimeIcon fontSize="small" />}
                          label={recipe.Duration || "30 min"}
                          variant="outlined"
                          size="small"
                          sx={{
                            borderColor: 'secondary.light',
                            color: 'secondary.main',
                            '& .MuiChip-icon': {
                              color: 'secondary.main'
                            }
                          }}
                        />
                      </Box>

                      {/* Expandable content */}
                      {isExpanded && (
                        <Fade in={isExpanded} timeout={500}>
                          <Box>
                            {/* Ingredients section */}
                            <Box mt={3}>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  color: 'primary.main',
                                  fontWeight: 600,
                                  fontSize: '1.1rem',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <PlaylistAddCheckIcon sx={{ mr: 1, fontSize: '1.1rem' }} />
                                Ingredients
                              </Typography>
                              <Divider sx={{ mb: 1.5, mt: 0.5 }} />
                              
                              {Array.isArray(recipe.Ingridents) && recipe.Ingridents.length > 0 ? (
                                <List dense sx={{ py: 0 }}>
                                  {recipe.Ingridents.map((ing, idx) => (
                                    <ListItem key={idx} disablePadding sx={{ py: 0.5 }}>
                                      <ListItemText
                                        primary={
                                          <Typography variant="body2" sx={{ fontFamily: 'inherit' }}>
                                            {`${ing.Count} ${ing.Type} ${ing.Name}`}
                                          </Typography>
                                        }
                                      />
                                    </ListItem>
                                  ))}
                                </List>
                              ) : (
                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', py: 1 }}>
                                  No ingredients available.
                                </Typography>
                              )}
                            </Box>

                            {/* Instructions section */}
                            <Box mt={3}>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  color: 'primary.main',
                                  fontWeight: 600,
                                  fontSize: '1.1rem',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <PlaylistAddCheckIcon sx={{ mr: 1, fontSize: '1.1rem' }} />
                                Instructions
                              </Typography>
                              <Divider sx={{ mb: 1.5, mt: 0.5 }} />
                              
                              {Array.isArray(recipe.Instructions) && recipe.Instructions.length > 0 ? (
                                <List dense sx={{ py: 0 }}>
                                  {recipe.Instructions.map((step, index) => (
                                    <ListItem key={index} sx={{ py: 0.75, alignItems: 'flex-start' }}>
                                      <Avatar 
                                        sx={{ 
                                          width: 24, 
                                          height: 24, 
                                          bgcolor: 'secondary.main',
                                          fontSize: '0.8rem',
                                          mr: 1.5,
                                          mt: 0.5
                                        }}
                                      >
                                        {index + 1}
                                      </Avatar>
                                      <ListItemText
                                        primary={
                                          <Typography 
                                            variant="body2" 
                                            sx={{ 
                                              lineHeight: 1.4
                                            }}
                                          >
                                            {step.Name}
                                          </Typography>
                                        }
                                      />
                                    </ListItem>
                                  ))}
                                </List>
                              ) : (
                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', py: 1 }}>
                                  No instructions available.
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </Fade>
                      )}

                      {/* Expand indicator */}
                      <Box 
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mt: 2,
                          opacity: 0.7
                        }}
                      >
                        <Tooltip title={isExpanded ? "Show less" : "Show more"}>
                          <IconButton 
                            size="small" 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(recipe.Id);
                            }}
                          >
                            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Fade>
  );
}

export default RecipeList;