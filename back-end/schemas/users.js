const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_INIT = process.env.SALT_INIT;

const user = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    created_on: {type: Date, default: Date.now()}
})

user.pre('save', function (next) {
    if(!this.isModified('password')) {
        return next();
    }

    const salt = bcrypt.genSaltSync(SALT_INIT);
    
    this.password = bcrypt.hashSync(this.password, salt);

    next();
})

user.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

user.statics.findUserByUsername = function (username) {
    return this.findOne({username}).exec();
}

module.exports = mongoose.model('User', user);