
const bcrypt = require('bcryptjs'), 
      mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, "Nom obligatoire pour l'inscription"]

    },
    email: {
        type : String,
        required :[true, "Email obligatoire pour l'inscription"],
        unique : true
    },
    password: {
        type : String,
        required :[true, "Veuillez saisir un mot de passe"]
    }
});

userSchema.pre('save',function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error,encrypted) => {
        user.password = encrypted
        next()
    })
});

module.exports = mongoose.model('User',userSchema)