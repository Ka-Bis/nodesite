const path = require('path'),
      post = require('../database/models/article')

module.exports = function(req,res){ // post de l'article
const {image} = req.files;
const uploadFile = path.resolve(__dirname,'..','public/articlesimage',image.name);

image.mv(uploadFile, (error) => {
    post.create(
        {
            ...req.body,
            image : `/articlesimage/${image.name}`
            
        },
        (error,post) => {   
        res.redirect('/')
    });
}); 
}
