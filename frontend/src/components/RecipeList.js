import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecipeList = ({ recipes, userId}) => {
    const handleLike = async (recipeId) => {
        try {
            await axios.put(`http://localhost:5000/recipes/like/${recipeId}`, { userId });
            // Optionally, refresh the recipe list or update state to reflect the like
        } catch (error) {
            console.error('Failed to like recipe:', error);
        }
    };

    return (
        <div>
            {recipes.map(recipe => (
                <div key={recipe._id} style={{ marginBottom: '20px' }}>
                    <Link to={`/recipes/${recipe._id}`}>
                        <img 
                            src={recipe.image} 
                            alt={recipe.title} 
                            style={{ width: '100px', height: '100px', marginRight: '10px' }} 
                        />
                        <h3>{recipe.title}</h3>
                        <p>Likes: {recipe.likes.length}</p>
                    </Link>
                    <p>{recipe.ingredients.substring(0, 100)}...</p>
                    <button onClick={() => handleLike(recipe._id)}>Like</button>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;
