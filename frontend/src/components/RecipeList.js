import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = ({ recipes }) => {
    return (
        <div>
            {recipes.map((recipe) => (
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

export default RecipeList;
