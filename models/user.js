const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "Email already exists"],
        validate: [isEmail, "Please enter a valid email"]
    },
    password:{
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Minimum password length is 6"]
    }
})

//Hashing the password
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email})

    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        } throw("Password Not Correct")

    } throw("Incorrect Email")
}

const User = mongoose.model('user', userSchema);

module.exports = User