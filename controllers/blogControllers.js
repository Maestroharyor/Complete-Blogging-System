const Blog = require('../models/blogs');

const blog_index = (req, res)=>{
    Blog.find()
    .then(result =>{
        res.render('blogs/index', {blogs: result})
    })
    .catch(error => {
        console.log(error)
    })
}

const blog_create = (req, res)=>{
    const blog = new Blog(
        req.body
    )
    blog.save()
    .then(result=> {
        res.redirect('/blogs')
    })
    .catch(error => {
        console.log(error)
    })
}

const blog_delete =(req, res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then(result => {
        console.log(result)
    })
    .error(error=>{
        console.log(error)
    })
}

const blog_single = (req, res)=>{
    const id = req.params.id
    Blog.findById(id)
    .then(result=>{
        res.render('blogs/post', {post: result})
    })
    .catch(error=>{
        res.render('static/404')
    })
}


const blog_update = (req, res) => {

    const {id, title, snippet, body, category} = req.body
    console.log(req.body);
    Blog.findByIdAndUpdate(id, {title, snippet, body, category}, {useFindAndModify: false})
    .then(result => {
        console.log(result)
        res.status(200).send("Updated")
    })
    .catch(error=>{
        console.log(error)
        res.status(404).send("Update Failed")
    })
    // res.send("Update Attempted")
}

module.exports = {
    blog_index,
    blog_create,
    blog_delete,
    blog_single,
    blog_update
}