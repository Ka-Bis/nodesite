const mongoose = require('mongoose');

const Article = require('./database/models/article');

mongoose.connect('mongodb://localhost:27017/blog-test');


// Article.findByIdAndUpdate('5cc81d5ca8c19028feadb842', { // modifie la liste en fction de l'ID
//     title:'Avengers Endgame'
// }, (error,post)=> {
//     console.log(error,post);
    
// })

// Article.findById('5cc835a14976ee2e6d862721', function(error,articles){ //cherche list en fct de l'ID
//     console.log(error,articles);
    
// })
 
// recherche par rapport a la base de donnée
Article.find({

},(error,articles) => {
    console.log(error,articles);
})


// Article.create({ //creation document dans collection
//     title: 'Spiderman',
//     intro: 'test intro',
//     content: 'Critique sur le film spiderman',
// },function (error,post) {
//     console.log(error, post);
    
// }
// )

