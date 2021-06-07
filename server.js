const express = require('express');
const app = express()
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')



app.set('view engine','html')
app.use(express.static('static'))
app.use(bodyParser.urlencoded({
    extended: false
}))

nunjucks.configure('views',({
    express:app
}))

app.get('/',(req,res)=>{
    res.render('main.html')
})

app.listen(3000,()=>{
    console.log('server start port 3000')
})

