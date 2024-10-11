const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

// Get all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('user', 'username');
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get recipes' });
    }
});

// Add a new recipe
router.post('/', async (req, res) => {
    const { title, ingredients, process, user } = req.body;
    try {
        const newRecipe = new Recipe({ title, ingredients, process, user });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add recipe' });
    }
});

// Get recipe by ID
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('user', 'username');
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get recipe' });
    }
});

// Like a recipe
router.put('/like/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe.likes.includes(req.body.userId)) {
            recipe.likes.push(req.body.userId);
            await recipe.save();
        }
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: 'Failed to like recipe' });
    }
});

// Add comment to recipe
router.post('/comment/:id', async (req, res) => {
    const { text, userId } = req.body;
    try {
        const recipe = await Recipe.findById(req.params.id);
        recipe.comments.push({ text, user: userId });
        await recipe.save();
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

module.exports = router;
