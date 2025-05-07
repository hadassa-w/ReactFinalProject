import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Register from './components/register';
import LogIn from './components/login';
import MyRecipes from './components/myRecipes';
import AddRecipes from './components/addRecipe';
import RecipeList from './components/recipes';
import { Box } from '@mui/material';
import Wellcome from './components/wellcome';
import Home from './components/home';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Box component="main" sx={{ p: 3 }}>
          <Routes>
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wellcome" element={<Wellcome />} />
            <Route path="/myRecipes" element={<MyRecipes />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/addRecipe" element={<AddRecipes />} />
            <Route path="/editRecipe/:id" element={<AddRecipes />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Box>
      </Router>
    </>
  );
}

export default App;