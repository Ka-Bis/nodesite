module.exports = function(req,res){ // ajout article
if(req.session.userId) {
    return res.render('article/add')
}
    res.redirect('/user/login')
} 