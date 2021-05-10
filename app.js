// const { response } = require('express');
const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./middlewares/authMiddleware');


//Routers
const blogRoutes = require('./routes/blogRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const staticRoutes = require('./routes/staticRoutes');



const app = express()


//Connect to database
const dbURI  = "mongodb://localhost:27017/testBlog";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(response => {
    console.log("Connected to db")
    app.listen(3000)
})
.catch(error=>{
    console.log("Error connecting to db: ", error)
})





//Register View Engines
app.set('view engine', 'ejs')

//Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());


//Check user on all routes
app.get('*', checkUser)

//Static Pages
app.use('/', staticRoutes)


//Dashboard Pages
app.use('/dashboard', requireAuth , dashboardRoutes)

//Blog Pages
app.use('/blogs', blogRoutes)

//Category
app.use('/category', categoryRoutes)


//404 Middleware
app.use((req, res)=>{
    res.render('static/404')
    res.status(404)
})