import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormHelperText,
    Paper,
    Stack,
    Divider,
    Snackbar,
    Alert,
    Grid,
    Tooltip,
    Chip,
    Container,
    useTheme,
    Stepper,
    Step,
    StepLabel,
} from "@mui/material";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Remove,
    Add,
    AccessTime,
    Category as CategoryIcon,
    Description,
    Image as ImageIcon,
    RestaurantMenu,
    ListAlt,
    ArrowBack,
    CloudUpload
} from "@mui/icons-material";
import Recipe from "../modules/recipe";
import { Category } from "../modules/category";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";

function AddRecipe() {
    const { userId } = useAuth();
    const { id } = useParams();
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [recipeData, setRecipeData] = useState<Recipe | null>(null);
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success");

    const theme = useTheme();
    const navigate = useNavigate();

    const steps = ['Basic Info', 'Ingredients', 'Instructions'];

    useEffect(() => {
        fetchCategories();
        if (id) {
            fetchRecipe(id);
        }
    }, [id]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/category");
            setCategories(res.data);
        } catch (err) {
            console.error(err);
            showSnackbar("Failed to load categories", "error");
        } finally {
            setCategoriesLoading(false);
        }
    };

    const fetchRecipe = async (id: string) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/recipe/${id}`);
            setRecipeData(res.data);
        } catch (err) {
            console.error(err);
            showSnackbar("Failed to load recipe", "error");
        }
    };

    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
        trigger,
    } = useForm<Recipe>({
        defaultValues: {
            Id: Number(id),
            Name: "",
            Description: "",
            Duration: "",
            Difficulty: "",
            Img: "/IMG/",
            Categoryid: 0,
            UserId: Number(userId),
            Instructions: [{ Name: "" }],
            Ingridents: [{ Name: "", Count: 0, Type: "" }],
        },
        mode: "onChange"
    });

    const {
        fields: instructionFields,
        append: appendInstruction,
        remove: removeInstruction,
    } = useFieldArray({ control, name: "Instructions" });

    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient,
    } = useFieldArray({ control, name: "Ingridents" });

    const showSnackbar = (message: string, severity: "success" | "error" | "info" | "warning") => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

const handleNext = async () => {
    let fieldsToValidate: string[] = [];
    
    if (activeStep === 0) {
        fieldsToValidate = ["Name", "Description", "Duration", "Difficulty", "Img", "Categoryid"];
    } else if (activeStep === 1) {
        fieldsToValidate = ingredientFields.flatMap((_, index) => [
            `Ingridents.${index}.Name`,
            `Ingridents.${index}.Count`,
            `Ingridents.${index}.Type`
        ]);
    }
    else if (activeStep === 2) {
        fieldsToValidate = instructionFields.flatMap((_, index) => [
            `instruction.${index}.Name`,
        ]);
    }
    
    const isStepValid = await trigger(fieldsToValidate as any);
    
    if (isStepValid) {
        if (activeStep === steps.length - 1) {
            // כאן תוכל לשמור את הנתונים
            await onSubmit(getValues()); // שמור את כל הערכים
        }
        setActiveStep((prevStep) => prevStep + 1);
    } else {
        showSnackbar("Please fill in all required fields correctly", "error");
        navigate("/myRecipes")
    }
};

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const onSubmit = async (data: Recipe) => {
        setLoading(true);
        try {
            if (id) {
                await axios.post(`http://localhost:8080/api/recipe/edit`, data);
                showSnackbar("Recipe updated successfully!", "success");
            } else {
                await axios.post("http://localhost:8080/api/recipe", data);
                showSnackbar("Recipe added successfully!", "success");
            }
            setTimeout(() => {
                navigate("/myRecipes");
            }, 2000);
        } catch (err) {
            console.error(err);
            showSnackbar("Failed to save recipe", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        try {
            const res = await axios.post("http://localhost:8080/api/category", {
                Name: newCategoryName,
                UserId: userId,
            });
            const addedCategory = res.data;
            setCategories((prev) => [...prev, addedCategory]);
            setValue("Categoryid", addedCategory.Id);
            setNewCategoryName("");
            setCategoryDialogOpen(false);
            showSnackbar("Category added successfully!", "success");
        } catch (err) {
            console.error(err);
            showSnackbar("Failed to add category", "error");
        }
    };

    useEffect(() => {
        if (recipeData && categories.length > 0) {
            setValue("Id", recipeData.Id);
            setValue("Name", recipeData.Name);
            setValue("Description", recipeData.Description);
            setValue("Duration", recipeData.Duration);
            setValue("Difficulty", recipeData.Difficulty);
            setValue("Img", recipeData.Img);
            setValue("Categoryid", recipeData.Categoryid);
            setValue("Instructions", recipeData.Instructions);
            setValue("Ingridents", recipeData.Ingridents);
        }
    }, [recipeData, categories, setValue]);

    const difficultyCounts = {
        Easy: { label: "Easy" },
        Medium: { label: "Medium" },
        Hard: { label: "Hard" },
        "Very hard": { label: "Very Hard" }
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Stack spacing={3} sx={{ mt: 2 }}>
                        <Controller
                            name="Name"
                            control={control}
                            rules={{ required: "Name is required" }}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Recipe Name"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <RestaurantMenu sx={{ color: 'primary.main', mr: 1 }} />,
                                    }}
                                    {...field}
                                    error={!!errors.Name}
                                    helperText={errors.Name?.message}
                                />
                            )}
                        />

                        <Controller
                            name="Description"
                            control={control}
                            rules={{ required: "Description is required" }}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Description"
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <Description sx={{ color: 'primary.main', mr: 1, alignSelf: 'flex-start', mt: 1 }} />,
                                    }}
                                    {...field}
                                    error={!!errors.Description}
                                    helperText={errors.Description?.message}
                                />
                            )}
                        />

                        <Controller
                            name="Duration"
                            control={control}
                            rules={{ required: "Duration is required" }}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Preparation Time"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <AccessTime sx={{ color: 'primary.main', mr: 1 }} />,
                                    }}
                                    {...field}
                                    error={!!errors.Duration}
                                    helperText={errors.Duration?.message}
                                />
                            )}
                        />

                        <FormControl fullWidth error={!!errors.Difficulty} variant="outlined">
                            <InputLabel id="difficulty-label">Difficulty Level</InputLabel>
                            <Controller
                                name="Difficulty"
                                control={control}
                                rules={{ required: "Difficulty level is required" }}
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        labelId="difficulty-label"
                                        label="Difficulty Level"
                                        {...field}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                {selected && (
                                                    <Chip
                                                        label={difficultyCounts[selected as keyof typeof difficultyCounts]?.label}
                                                        size="small"
                                                        sx={{
                                                            fontWeight: 'bold',
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        )}
                                    >
                                        {Object.entries(difficultyCounts).map(([value, { label }]) => (
                                            <MenuItem key={value} value={value}>
                                                <Chip
                                                    label={label}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                    }}
                                                />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.Difficulty && <FormHelperText>{errors.Difficulty.message}</FormHelperText>}
                        </FormControl>

                        <Controller
                            name="Img"
                            control={control}
                            rules={{ required: "Image URL is required" }}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    label="Image Filename"
                                    placeholder="Enter URL or image"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <ImageIcon sx={{ color: 'primary.main', mr: 1 }} />,
                                    }}
                                    value={field.value?.replace(/^\/?IMG\//, '') || ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const withPrefix = `/IMG/${value.replace(/^\/?IMG\//, '')}`;
                                        field.onChange(withPrefix);
                                    }}
                                    error={!!errors.Img}
                                    helperText={errors.Img?.message}
                                />
                            )}
                        />

                        <FormControl fullWidth error={!!errors.Categoryid} variant="outlined">
                            <InputLabel id="category-label">Recipe Category</InputLabel>
                            <Controller
                                name="Categoryid"
                                control={control}
                                rules={{
                                    required: "Category is required",
                                }}
                                render={({ field }) => (
                                    <Select
                                        labelId="category-label"
                                        label="Recipe Category"
                                        {...field}
                                        disabled={categoriesLoading}
                                        startAdornment={<CategoryIcon sx={{ color: 'primary.main', mr: 1 }} />}
                                        endAdornment={
                                            <Tooltip title="Add new category">
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCategoryDialogOpen(true);
                                                    }}
                                                    sx={{ mr: 2 }}
                                                >
                                                    <Add />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category.Id} value={category.Id}>
                                                {category.Name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.Categoryid && <FormHelperText>{errors.Categoryid.message}</FormHelperText>}
                        </FormControl>
                    </Stack>
                );
            case 1:
                return (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <RestaurantMenu sx={{ mr: 1, color: 'primary.main' }} />
                            Ingredients
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                            {ingredientFields.map((item, index) => (
                                <Box key={item.id} sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12} sm={5}>
                                            <Controller
                                                name={`Ingridents.${index}.Name`}
                                                control={control}
                                                rules={{ required: "Ingredient name is required" }}
                                                render={({ field }) => (
                                                    <TextField
                                                        fullWidth
                                                        label="Ingredient"
                                                        placeholder="e.g. Flour, Eggs, etc."
                                                        variant="outlined"
                                                        size="small"
                                                        {...field}
                                                        error={!!errors.Ingridents?.[index]?.Name}
                                                        helperText={errors.Ingridents?.[index]?.Name?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Controller
                                                name={`Ingridents.${index}.Count`}
                                                control={control}
                                                rules={{ required: "Amount is required" }}
                                                render={({ field }) => (
                                                    <TextField
                                                        fullWidth
                                                        label="Amount"
                                                        type="number"
                                                        variant="outlined"
                                                        size="small"
                                                        {...field}
                                                        error={!!errors.Ingridents?.[index]?.Count}
                                                        helperText={errors.Ingridents?.[index]?.Count?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={3}>
                                            <Controller
                                                name={`Ingridents.${index}.Type`}
                                                control={control}
                                                rules={{ required: "Unit is required" }}
                                                render={({ field }) => (
                                                    <TextField
                                                        fullWidth
                                                        label="Unit"
                                                        placeholder="g, ml, tsp"
                                                        variant="outlined"
                                                        size="small"
                                                        {...field}
                                                        error={!!errors.Ingridents?.[index]?.Type}
                                                        helperText={errors.Ingridents?.[index]?.Type?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={1} sx={{ textAlign: 'center' }}>
                                            <Tooltip title="Remove ingredient">
                                                <IconButton
                                                    onClick={() => removeIngredient(index)}
                                                    disabled={ingredientFields.length === 1}
                                                    color="error"
                                                    size="small"
                                                >
                                                    <Remove />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                    {index < ingredientFields.length - 1 && (
                                        <Divider sx={{ my: 2 }} />
                                    )}
                                </Box>
                            ))}
                        </Paper>
                        <Button
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={() => appendIngredient({ Name: "", Count: 0, Type: "" })}
                            sx={{
                                borderRadius: 4,
                                textTransform: "none",
                                px: 3
                            }}
                        >
                            Add Ingredient
                        </Button>
                    </Box>
                );
            case 2:
                return (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                            <ListAlt sx={{ mr: 1, color: 'primary.main' }} />
                            Cooking Instructions
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                            {instructionFields.map((item, index) => (
                                <Box key={item.id} sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={10}>
                                            <Controller
                                                name={`Instructions.${index}.Name`}
                                                control={control}
                                                rules={{ required: "Instruction is required" }}
                                                render={({ field }) => (
                                                    <TextField
                                                        fullWidth
                                                        placeholder="Describe this cooking step..."
                                                        variant="outlined"
                                                        multiline
                                                        rows={2}
                                                        {...field}
                                                        error={!!errors.Instructions?.[index]?.Name}
                                                        helperText={errors.Instructions?.[index]?.Name?.message}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={1} sx={{ textAlign: 'center' }}>
                                            <Tooltip title="Remove step">
                                                <IconButton
                                                    onClick={() => removeInstruction(index)}
                                                    disabled={instructionFields.length === 1}
                                                    color="error"
                                                    size="small"
                                                >
                                                    <Remove />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                    {index < instructionFields.length - 1 && (
                                        <Divider sx={{ my: 2 }} />
                                    )}
                                </Box>
                            ))}
                        </Paper>
                        <Button
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={() => appendInstruction({ Name: "" })}
                            sx={{
                                borderRadius: 4,
                                textTransform: "none",
                                px: 3
                            }}
                        >
                            Add Instruction
                        </Button>
                    </Box>
                );
            default:
                return "Loading...";
        }
    };

    return (
        <Container maxWidth="md">
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 2, sm: 4 },
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '8px',
                        background: 'linear-gradient(90deg, #FF4081 0%, #7C4DFF 50%, #00BCD4 100%)',
                    }
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => navigate(-1)}
                        sx={{ textTransform: "none" }}
                    >
                        Back
                    </Button>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: theme.palette.primary.main, textAlign: 'center', flex: 1 }}>
                        {id ? "Edit Recipe" : "Create New Recipe"}
                    </Typography>
                    <Box sx={{ width: 40 }}></Box>
                </Box>

                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {getStepContent(activeStep)}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 2, borderTop: '1px solid #eee' }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ textTransform: "none" }}
                        >
                            Back
                        </Button>

                        <Box>
                            {activeStep === steps.length? (
                                <Button
                                    variant="contained"
                                    type="submit"
                                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CloudUpload />}
                                    disabled={loading}
                                    sx={{
                                        borderRadius: 4,
                                        px: 4,
                                        py: 1,
                                        textTransform: "none",
                                        boxShadow: 2,
                                        fontSize: "1rem"
                                    }}
                                >
                                    {id ? "Save Changes" : "Add Recipe"}
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{
                                        borderRadius: 4,
                                        px: 4,
                                        py: 1,
                                        textTransform: "none",
                                        boxShadow: 2
                                    }}
                                >
                                    Next
                                </Button>
                            )}
                        </Box>
                    </Box>
                </form>

                <Dialog
                    open={categoryDialogOpen}
                    onClose={() => setCategoryDialogOpen(false)}
                    fullWidth
                    maxWidth="xs"
                    PaperProps={{
                        sx: {
                            borderRadius: 2,
                            overflow: 'hidden',
                        }
                    }}
                >
                    <DialogTitle sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <CategoryIcon sx={{ mr: 1 }} />
                        Add New Category
                    </DialogTitle>
                    <DialogContent sx={{ pt: 3, pb: 1 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Category Name"
                            fullWidth
                            variant="outlined"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                        <Button
                            onClick={() => setCategoryDialogOpen(false)}
                            sx={{ textTransform: "none", borderRadius: 2 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddCategory}
                            variant="contained"
                            disabled={!newCategoryName.trim()}
                            sx={{ textTransform: "none", borderRadius: 2 }}
                        >
                            Add Category
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={5000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        onClose={() => setSnackbarOpen(false)}
                        severity={snackbarSeverity}
                        sx={{ width: '100%' }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
}

export default AddRecipe;