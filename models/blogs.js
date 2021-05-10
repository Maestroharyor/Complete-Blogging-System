const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create BlogSchema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {timestamps: true})

//Create Model
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog