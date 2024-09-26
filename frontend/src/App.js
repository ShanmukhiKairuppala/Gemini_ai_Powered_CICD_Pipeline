import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddRecipe from './components/AddRecipe';
import RecipeDetails from './components/RecipeDetails';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-recipe" element={<AddRecipe />} />
                <Route path="/recipes/:id" element={<RecipeDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
