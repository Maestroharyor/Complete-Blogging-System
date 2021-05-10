const Blog = require('../models/blogs');

const dashboard_index = (req, res)=>{

    Blog.find()
    .then(result => {
        res.render('dashboard/dashboard', {lists: result})
    })
    .catch(error =>{
        console.log(error)
    })
}

const dashboard_add = (req, res)=>{
    res.render('dashboard/add')
}

const dashboard_update_load = (req, res) =>{
    const id = req.params.id
    Blog.findById(id)
    .then(result => {
        res.render('dashboard/update', {post: result})
    })
    .catch(error =>{
        res.redirect('/')
    })
    
}


module.exports = {
    dashboard_index,
    dashboard_add,
    dashboard_update_load
}