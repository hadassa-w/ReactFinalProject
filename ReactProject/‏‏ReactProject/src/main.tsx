import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from 'react-router-dom'
import Home from './components/home.tsx'
import LogIn from './components/login.tsx'
import Register from './components/register.tsx'
import MyRecipes from './components/myRecipes.tsx'
import Recipes from './components/recipes.tsx'
import AddRecipes from './components/addRecipe.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

createBrowserRouter([
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "logIn",
        element: <LogIn  setIsLoggedIn={() => { }}/> // העברת הפונקציה setIsLoggedIn כפרופס
      },
      {
        path: "register",
        element: <Register setIsLoggedIn={() => { }} />
      },
      {
        path: "myRecipes",
        element: <MyRecipes />
      },
      {
        path: "recipes",
        element: <Recipes />
      },
      {
        path: "addRecipes",
        element: <AddRecipes />
      },
    ]
  }
]);