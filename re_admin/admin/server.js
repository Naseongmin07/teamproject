const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const Router = require('./routes/index.js')
const session = require('express-session')
const morgan = require('morgan')
const {sequelize} = require('./models')
const cookieParser = require('cookie-parser')
require('dotenv').config('env')


const port = process.env.PORT||3001

sequelize.sync({force:false})
.then(()=>{
    console.log('db success')
})
.catch((err)=>{
    console.log('db fail',err)
})

app.set('view engine','html')
nunjucks.configure('views',{express:app,watch:true})

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


app.use('/uploads',express.static('uploads'))
app.use(express.static('uploads/'))
//app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.static('public'))
app.use(session({
    resave:false,
    // resave -> 세션을 언제나 저장할지에 대한 것 false가 기본값
    secret:process.env.COOKIE_SECRET,
    // secret -> 쿠키 변조를 막기 위한 세션 암호화
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        secure:false
    }
}))

app.use(Router)

app.listen(port,()=>{
    console.log(`server start port ${port}`)
})