const express = require('express')
const app = express()

const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const flash=require('connect-flash')
//const BlogPost=require('./models/BlogPost')

const { error } = require('console')
const fileUpload = require('express-fileupload')
app.use(fileUpload())
const validateMiddleWare =require('./MiddleWare/validateMiddleWare')
const expressSession=require('express-session')
const authMiddleware = require('./MiddleWare/authMiddleWare')
const redirectIfAuthenticatedMiddleware=require('./MiddleWare/redirectIfAuthenticatedMiddleware')
const newPostController = require('./controllers/newPost')
const PostController=require('./controllers/getPost')
const AboutController=require('./controllers/about')
const ContactController=require('./controllers/contact')
const HomeController=require('./controllers/home')
const storeUserController = require('./controllers/storeUser')
const NewUserController=require('./controllers/newUser')
const StorePostController=require('./controllers/storePost')
const LoginController=require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController=require('./controllers/logout')
global.loggedIn = null;
app.use('/posts/store', validateMiddleWare)
mongoose.connect('mongodb+srv://samoray1998:L9lawi98@cluster0.cq3po.mongodb.net/myDb', { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession({
    secret: 'keyboard cat',

    saveUninitialized: true,

}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
})
app.use(flash())
let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}
app.listen(port, () => {
    console.log('App listening...')
})
// app.listen(5000, () => {
//     console.log('app listen on port 5000')
// })
// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname, ‘pages/index.html'))
//     })
app.get('/',HomeController)
app.get('/about', AboutController)
app.get('/contact', ContactController)
app.get('/post/:id', PostController)
app.get('/posts/new', authMiddleware,newPostController)
app.post('/posts/store',authMiddleware, StorePostController)
app.get('/auth/register',redirectIfAuthenticatedMiddleware,NewUserController)
app.post('/users/register',redirectIfAuthenticatedMiddleware ,storeUserController)
app.get('/auth/login',redirectIfAuthenticatedMiddleware,LoginController)
app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController)
app.get('/auth/logout',logoutController)
app.use((req, res) => res.render('notfound'))

