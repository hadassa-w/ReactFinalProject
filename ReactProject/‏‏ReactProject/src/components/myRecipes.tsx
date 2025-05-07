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
    List,
    ListItem,
    ListItemText,
    Tooltip,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Container,
    Divider,
    Paper,
    Fade,
    alpha,
    Avatar,
    useTheme,
    useMediaQuery
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SpeedIcon from "@mui/icons-material/Speed";
import CategoryIcon from "@mui/icons-material/Category";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useNavigate } from "react-router-dom";
import Recipe from "../modules/recipe";
import { useAuth } from "../context/authContext";
import { Category } from "../modules/category";

function MyRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);
    const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);
    const navigate = useNavigate();
    const { userId } = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [fadeIn, setFadeIn] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        setTimeout(() => setFadeIn(true), 100);

        const fetchRecipes = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/recipe");
                const userRecipes = response.data.filter(
                    (recipe: Recipe) => recipe.UserId === userId
                );
                setRecipes(userRecipes);
            } catch (err) {
                console.error("Error fetching recipes:", err);
                setError("Failed to load recipes or categories.");
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const categoriesRes = await axios.get("http://localhost:8080/api/category");
                setCategories(categoriesRes.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load recipes or categories.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
        fetchCategories();
    }, [userId]);

    const handleEdit = (id: number) => {
        navigate(`/editRecipe/${id}`);
    };

    const confirmDelete = (id: number) => {
        setSelectedRecipeId(id);
        setOpenDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedRecipeId === null) return;
        try {
            await axios.post(`http://localhost:8080/api/recipe/delete/${selectedRecipeId}`);
            setRecipes(recipes.filter((r) => r.Id !== selectedRecipeId));
        } catch (err) {
            console.error("Failed to delete recipe:", err);
            setError("Error deleting recipe.");
        } finally {
            setOpenDialog(false);
            setSelectedRecipeId(null);
        }
    };

    const toggleExpand = (id: number) => {
        setExpandedRecipe(expandedRecipe === id ? null : id);
    };

    const getCategoryName = (categoryId: number): string => {
        return categories.find(category => category.Id === categoryId)?.Name || "Unknown";
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
                    Loading your recipes...
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
                    color="primary"
                    sx={{ mt: 3, textTransform: "none", color: "black", borderColor: "black" }}
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </Button>
            </Box>
        );
    }

    if (recipes.length === 0) {
        return (
            <Container maxWidth="md">
                <Paper
                    elevation={3}
                    sx={{
                        textAlign: "center",
                        mt: 8,
                        p: 5,
                        borderRadius: 4,
                        backgroundColor: alpha('#f8f9fa', 0.8),
                    }}
                >
                    <RestaurantMenuIcon sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.6 }} />
                    <Typography variant="h5" fontWeight="500" mt={2} color="text.secondary">
                        Your recipe collection is empty
                    </Typography>
                    <Typography variant="body1" mt={2} color="text.secondary">
                        You haven't added any recipes yet. Start building your personal cookbook!
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            mt: 4,
                            borderRadius: 28,
                            px: 4,
                            py: 1,
                            fontSize: '1rem',
                            textTransform: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            '&:hover': {
                                boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                                transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.3s'
                        }}
                        onClick={() => navigate('/addRecipe')}
                    >
                        Create Your First Recipe
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Fade in={fadeIn} timeout={800}>
            <Container>
                <Box
                    sx={{
                        mb: 6,
                        pb: 2,
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: isMobile ? 'flex-start' : 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MenuBookIcon
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
                            My Recipe Collection
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<RestaurantMenuIcon />}
                        onClick={() => navigate('/addRecipe')}
                        sx={{
                            borderRadius: 28,
                            px: 3,
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            '&:hover': {
                                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                                transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.3s'
                        }}
                    >
                        Add New Recipe
                    </Button>
                </Box>

                <Grid container spacing={4}>
                    {recipes.map((recipe) => {
                        const isExpanded = expandedRecipe === recipe.Id;

                        return (
                            <Grid item xs={12} sm={6} md={6} lg={4} key={recipe.Id}>
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
                                            image={recipe.Img}
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
                                            // mb: 2 
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

                                        {/* Action buttons */}
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                mt: 3,
                                                pt: 1,
                                                borderTop: '1px dashed',
                                                borderColor: 'divider'
                                            }}
                                        >
                                            <Tooltip title="Edit Recipe">
                                                <Button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(recipe.Id);
                                                    }}
                                                    startIcon={<EditIcon />}
                                                    color="primary"
                                                    size="small"
                                                    variant="text"
                                                    sx={{
                                                        textTransform: 'none',
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </Tooltip>

                                            <Tooltip title="Delete Recipe">
                                                <Button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        confirmDelete(recipe.Id);
                                                    }}
                                                    startIcon={<DeleteIcon />}
                                                    color="error"
                                                    size="small"
                                                    variant="text"
                                                    sx={{
                                                        textTransform: 'none',
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </Tooltip>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    PaperProps={{
                        sx: {
                            borderRadius: 3,
                            p: 1
                        }
                    }}
                >
                    <DialogTitle id="alert-dialog-title" sx={{
                        color: 'error.main',
                        fontWeight: 600,
                        pb: 1
                    }}>
                        Delete Recipe?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" sx={{ color: 'text.primary' }}>
                            Are you sure you want to delete this recipe?
                            <br />
                            This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button
                            onClick={() => setOpenDialog(false)}
                            variant="outlined"
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                px: 3
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            color="error"
                            variant="contained"
                            autoFocus
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                px: 3,
                                boxShadow: '0 4px 12px rgba(211, 47, 47, 0.2)'
                            }}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Fade>
    );
}

export default MyRecipes;