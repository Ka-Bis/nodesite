module.exports = function(req,res){ // register    
    res.render('register', {
        errors : req.flash('RegisterError'),
        data : req.flash('data')[0]
    })
}