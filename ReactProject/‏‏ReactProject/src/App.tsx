import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NewHeader from './components/newHeader';
import Header from './components/header'; // קומפוננטה חדשה למשתמשים מחוברים
import Register from './components/register';
import LogIn from './components/login';
import Home from './components/home';
import MyRecipes from './components/myRecipes';
import Recipes from './components/recipes';
import AddRecipes from './components/addRecipe';
import Page from './components/page';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('isLoggedIn');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  return (
    <>
      <Router>
        {isLoggedIn ? <Header setIsLoggedIn={setIsLoggedIn} /> : <NewHeader />} {/* הצגת הקומפוננטה המתאימה */}
        <Box component="main" sx={{ p: 3 }}>
          <Routes>
            <Route path="/logIn" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} /> {/* העברת הפונקציה לשינוי מצב התחברות */}
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} /> {/* העברת הפונקציה לשינוי מצב התחברות */}
            <Route path="/home" element={<Home />} />
            <Route path="/myRecipes" element={<MyRecipes />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/addRecipes" element={<AddRecipes />} />
            <Route path="/" element={<Page />} />
          </Routes>
        </Box>
      </Router>
    </>
  );
}

export default App;