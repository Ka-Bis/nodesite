const express = require('express'),
      expHand = require('express-handlebars'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      fileUpload = require('express-fileupload'),
      expressSession = require('express-session'),
      MongoStore = require('connect-mongo'),
      connectFlash = require('connect-flash'),
      app = express();
var port = 4000;

// Controller
//--- Article
const articleSingleController = require('./controller/articleSingle'),
      articleAddController = require('./controller/articleAdd'),
      articlePostController = require('./controller/articlePost');
//--- User
const userCreate = require('./controller/userCreate'),
      userRegister = require('./controller/userRegister'),
      userLogin = require('./controller/userLogin'),
      userLoginAuth = require('./controller/userLoginAuth'),
      userLogout = require('./controller/userLogout');
//--- Middleware
const articleValidPost = require('./middleware/articleValidPost'),
      auth = require('./middleware/auth')
      redirectAuthSuccess = require('./middleware/redirectAuthSuccess');
//--- Contact
const contactController = require('./controller/contact');
//--- Homepage
const homePageController = require('./controller/homePage');
//--- Helper
const {stripTags} = require('./helper/hbs');

// Connexion avc mongoose
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/blog',{ useNewUrlParser: true })
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));

// FileUpload
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

// Appelle les fichiers static dns dossier public
app.use(express.static('public')); 

// Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// FileUpload
app.use(fileUpload());

// Connect Flash
app.use(connectFlash());

// Express session
const mongoStore = MongoStore(expressSession)
app.use(expressSession({
    secret: 'security',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,

    store: new mongoStore(
        {mongooseConnection: mongoose.connection}
    )
}))

// Routage
app.use('*',(req,res,next)=> {
    res.locals.user = req.session.userId
    // console.log(res.locals.user);
    next()
})
app.engine('handlebars', expHand({
    helpers: {
        stripTags: stripTags
    },
    defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Middleware
app.use('/articles/post',articleValidPost);
app.use('/article/add', auth)

// Home
app.get('/',homePageController)

// Article
app.get('/articles/add', auth, articleAddController)
app.get('/articles/:id', articleSingleController)
app.post('/articles/post',auth, articleValidPost, articlePostController);

// User
app.get('/user/create',redirectAuthSuccess, userCreate)
app.get('/user/login', redirectAuthSuccess,userLogin)
app.get('/user/logout',userLogout)
app.post('/user/register',redirectAuthSuccess,userRegister)
app.post('/user/loginAuth',redirectAuthSuccess,userLoginAuth)

// Contact
app.get('/contact',contactController)

// 404 error
app.use((req,res)=> {
    res.render('404')
})

// Port
app.listen(port,function(){
    console.log('Listen on : '+`http://localhost:${port}`);
})
