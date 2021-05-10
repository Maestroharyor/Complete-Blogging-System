const express = require('express');
const Blog = require('../models/blogs');

const router = express.Router();


router.get('/:id', (req, res)=>{
    const id = req.params.id
    Blog.find({category: id})
    .then(result => {
        res.render('blogs/category', {blogs: result, title: id})
    })
    .catch(error => {
        console.log(error)
    })
})

module.exports = router;