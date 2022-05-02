const mongoose = require('mongoose')
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        maxLength: 50,
        minLength: 3,
    },
    email: {
        type: String,
        required: [true, 'please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            , 'please provide valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minLength: 8
    }
})

UserSchema.pre('save', async function () {
    const salt = await bycript.genSalt(10);
    this.password = await bycript.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFE });
}

UserSchema.methods.comparePassword = async function (userPassword) {
    return bycript.compare(userPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);