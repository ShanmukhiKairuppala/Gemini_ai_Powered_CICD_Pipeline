import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addRecipe.css';
const AddRecipe = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [process, setProcess] = useState('');
    const navigate = useNavigate();

    const handleAddRecipe = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:5000/recipes',
                { title, ingredients, process },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate('/');
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    return (
        <div class = 'addRecipe'> 
            <h2>Add Recipe</h2>
            <form onSubmit={handleAddRecipe}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div class = 'recdetails'>
                    <label>Ingredients:</label>
                    <textarea
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />
                </div>
                <div class = 'recdetails'>
                    <label>Process:</label>
                    <textarea
                        value={process}
                        onChange={(e) => setProcess(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
};

export default AddRecipe;
