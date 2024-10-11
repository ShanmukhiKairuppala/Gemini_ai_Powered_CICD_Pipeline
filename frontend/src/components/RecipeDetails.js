import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    // const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await axios.get(`http://localhost:5000/recipes/${id}`);
            setRecipe(response.data);
        };
        fetchRecipe();
    }, [id]);

    if (!recipe) return <div>Loading...</div>;

    // const handleComment = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const token = localStorage.getItem('token');
    //         await axios.post(
    //             `http://localhost:5000/recipes/comment/${id}`,
    //             { text: comment },
    //             { headers: { Authorization: `Bearer ${token}` } }
    //         );
    //         setComment('');
    //     } catch (error) {
    //         console.error('Error adding comment:', error);
    //     }
    // };

    // if (!recipe) return <div>Loading...</div>;

    return (
        <div style={{ display: 'flex', margin: '20px' }}>
            <img 
                src={recipe.image} 
                alt={recipe.title} 
                style={{ width: '300px', height: '300px', marginRight: '20px' }} 
            />
        <div >
            <h2>{recipe.title}</h2>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Process:</strong> {recipe.process}</p>
            <p><strong>Likes:</strong> {recipe.likes.length}</p>
            <h3>Comments</h3>
            <ul>
                {recipe.comments.map((c, index) => (
                    <li key={index}>{c.text}</li>
                ))}
            </ul>
            {/* <form onSubmit={handleComment}>
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
            </form> */}
        </div>
        </div>
    );
};

export default RecipeDetails;
