const jwt = require('jsonwebtoken');
const User = require('../models/user')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'secretkey', (error, decodedToken)=>{
            if(error){
                console.log(error.message)
                res.redirect('/login')
            } else{
                console.log(decodedToken)
                next();
            }
        })
    } else{
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'secretkey',  async (error, decodedToken)=>{
            if(error){
                console.log(error.message)
                res.locals.user = null;
                next()
            } else{
                let user = await User.findById(decodedToken.id)
                res.locals.user = user;
                next()

            }
        })
    } else{
        res.locals.user = null;
        next()

    }
}

module.exports = {requireAuth, checkUser}