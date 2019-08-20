//Post
const post = require('../database/models/article')

module.exports = async function (req, res) { // accueil
    const posts = await post.find({})
    // console.log(req.session);

    res.render('index', { posts })
} 