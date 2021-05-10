const User = require('../models/user');
const jwt = require('jsonwebtoken');


const maxAge = 3 * 24 * 60 * 60

const createToken = id =>{
    return jwt.sign({id}, 'secretkey', {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) =>{
    res.render('static/signup')
}

module.exports.login_get = (req, res) =>{
    res.render('static/login')
}

module.exports.signup_post = (req, res) =>{
    const {username, email, password} = req.body;

    const newUser= new User({username, email, password})

    newUser.save()
    .then(result => {
        const token = createToken(newUser._id)

        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(200).json({user: newUser._id})
        console.log(result)
    })
    .catch(error => {
        const errors = {username:"", email:"", password:""}

        if(error.message.includes("user validation failed")){
            Object.values(error.errors).forEach(({properties}) =>{
                errors[properties.path] = properties.message
            })
        } else if (error.code === 11000){
                errors.email = "Email already exists"
        }

        res.status(404).json({errors})
    })
    

}

module.exports.login_post = async (req, res) =>{
    // res.render('Login Attempted')
    const {email, password} = req.body;

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id);

        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(200).json({user: user._id})


    } catch (error) {
        const errors = {email:"", password:""};
        if(error === 'Incorrect Email'){
            errors.email = "Incorrect Email"
        }

        if(error === "Password Not Correct"){
            errors.password = "Incorrect Password"
        }

        res.status(404).json({errors})
    }
}

module.exports.logout_get = (req, res)=>{
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/login')
}