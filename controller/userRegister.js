const user = require('../database/models/user')

module.exports = (req,res) => { // regiter    
    user.create(req.body, (error, user) => {
            if(error){
                const registerError = Object.keys(error.errors).map(key => error.errors[key].message);
                
                req.flash('RegisterError', registerError)
                req.flash('data', req.body)

                return res.redirect('/user/create')
            }            
                res.redirect('/')
        }
    )
}
