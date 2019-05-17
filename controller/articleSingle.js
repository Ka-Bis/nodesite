const post = require('../database/models/article')

module.exports = async function(req,res){ // page article
    const article = await post.findById(req.params.id)
    // console.log(req.params);
    res.render('article', {article})
}