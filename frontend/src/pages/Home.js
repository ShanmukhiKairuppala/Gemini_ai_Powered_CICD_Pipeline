import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './home.css';
import RecipeList from '../components/RecipeList';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect if user is not logged in
        }

        const fetchRecipes = async () => {
            const response = await axios.get('http://localhost:5000/recipes');
            setRecipes(response.data);
        };
        fetchRecipes();
    }, [navigate]);

         // Filter recipes based on search term
    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div>
            <h2>Recipes</h2>
            <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
             <RecipeList recipes={filteredRecipes} userId={localStorage.getItem('userId')} />
            {/* {filteredRecipes.map(recipe => (
                <div key={recipe._id} style={{ marginBottom: '20px' }}>
                    <Link to={`/recipes/${recipe._id}`}>
                        <img src={recipe.image} alt={recipe.title} style={{ width: '100px', height: '100px', marginRight: '10px' }} />
                        <h3>{recipe.title}</h3>
                        <p>Likes: {recipe.likes.length}</p>
                    </Link>
                    <p>{recipe.ingredients.substring(0, 100)}...</p>
                </div>
            ))} */}
            {/* {recipes.map(recipe => (
                <div key={recipe._id}>
                    <Link to={`/recipes/${recipe._id}`}>
                        <h3>{recipe.title}</h3>
                    </Link>
                    <p>{recipe.ingredients.substring(0, 100)}...</p>
                </div>
            ))} */}
        </div>
    );
};

export default Home;
