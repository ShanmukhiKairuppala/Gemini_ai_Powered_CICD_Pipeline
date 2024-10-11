const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    process: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: { type: [String], default: [] },
    comments: { type: [{ text: String, user: String }], default: [] },
    image: { type: String, required: true },
    // likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // comments: [{ text: String, user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
    // rating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Recipe', recipeSchema);
