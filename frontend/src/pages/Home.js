import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await axios.get('http://localhost:5000/recipes');
            setRecipes(response.data);
        };
        fetchRecipes();
    }, []);

    return (
        <div>
            <h2>Recipes</h2>
            {recipes.map(recipe => (
                <div key={recipe._id}>
                    <Link to={`/recipes/${recipe._id}`}>
                        <h3>{recipe.title}</h3>
                    </Link>
                    <p>{recipe.ingredients.substring(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
