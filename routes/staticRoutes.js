const express = require('express');
const authControllers = require('../controllers/authControllers')

const router = express.Router()

router.get('/', (req, res)=>{
    res.redirect('/blogs')
})

router.get('/about', (req, res)=>{
    res.render('static/about')
})

//Auth

router.get('/signup', authControllers.signup_get);
router.get('/login', authControllers.login_get);

router.post('/signup', authControllers.signup_post);
router.post('/login', authControllers.login_post);

router.get('/logout', authControllers.logout_get)

module.exports = router
