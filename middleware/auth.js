const user = require('../database/models/user')

module.exports = (req,res,next) => {
    // Connection dans la DBS
    user.findById(req.session.userId, (error,user) => {
        if(error || !user) {
            return res.redirect('/user/login')
        }
        next()
    })
    // Verifie le user

    // Si user dans DBS

    // Sinon redirection
}