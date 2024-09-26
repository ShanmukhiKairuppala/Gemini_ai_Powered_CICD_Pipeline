import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/recipes/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        fetchRecipe();
    }, [id]);

    const handleComment = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:5000/recipes/comment/${id}`,
                { text: comment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    if (!recipe) return <div>Loading...</div>;

    return (
        <div>
            <h2>{recipe.title}</h2>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Process:</strong> {recipe.process}</p>
            <h3>Comments</h3>
            <ul>
                {recipe.comments.map((c, index) => (
                    <li key={index}>{c.text}</li>
                ))}
            </ul>
            <form onSubmit={handleComment}>
                <div>
                    <label>Comment:</label>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};

export default RecipeDetails;
