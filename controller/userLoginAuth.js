const user = require('../database/models/user'),
      bcrypt = require('bcryptjs');

module.exports = function(req,res){
    const {email, password} = req.body;
    user.findOne({email}, (error,user) => {
        if(user) {
            bcrypt.compare(password,user.password, (error,same) => {
                if(same){
                    req.session.userId = user._id
                    res.redirect('/')
                } else {
                    res.redirect('/user/login')
                }
            })
        } else {
            return res.redirect('/')
        };
    });
}