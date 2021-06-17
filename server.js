const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
require('dotenv').config('env')
const Router = require('./routes/index')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const session = require('express-session')
const { sequelize } = require('./models')
const socket = require('socket.io');
const http = require('http');
const { min } = require('./models/user')
const server = http.createServer(app);
const io = socket(server);




//const sequelize = require('/models').sequelize

sequelize.sync({ force: false })
    .then(() => {
        console.log('suc')
    })
    .catch((err) => {
        console.log(err)
    })
app.use(express.static('./node_modules/socket.io/client-dist'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('/uploads'))
app.use(cookieParser(process.env.COOKIE_SECRET))



app.set('view engine', 'html')

app.use(express.static('public'))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}))

nunjucks.configure('views', { express: app })

app.use('/', Router)



io.sockets.on('connection', function(socket) {

      /* 새로운 유저가 접속했을 경우 다른 소켓에게도 알려줌 */
      socket.on('newUser', function(name) {
        console.log(name + ' 님이 접속하였습니다.')
        Date.prototype.format = function (f) {

          if (!this.valueOf()) return " ";
      
      
      
          var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
      
          var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];
      
          var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      
          var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      
          var d = this;
      
      
      
          return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
      
              switch ($1) {
      
                  case "yyyy": return d.getFullYear(); // 년 (4자리)
      
                  case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)
      
                  case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)
      
                  case "dd": return d.getDate().zf(2); // 일 (2자리)
      
                  case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)
      
                  case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)
      
                  case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)
      
                  case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)
      
                  case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)
      
                  case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)
      
                  case "mm": return d.getMinutes().zf(2); // 분 (2자리)
      
                  case "ss": return d.getSeconds().zf(2); // 초 (2자리)
      
                  case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분
      
                  default: return $1;
      
              }
      
          });
      
      };
        /* 소켓에 이름 저장해두기 */
        socket.name = name
        String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };

        String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };

        Number.prototype.zf = function (len) { return this.toString().zf(len); };
        let today = new Date(); 

        /* 모든 소켓에게 전송 */
        io.sockets.emit('update', {type: 'connect',  message: name + '님이 접속하였습니다.',  today:`${today.format('a/p hh:mm')}`})
       
      })
    
      /* 전송한 메시지 받기 */
      socket.on('message', function(data) {
        /* 받은 데이터에 누가 보냈는지 이름을 추가 */
        data.name = socket.name
        
        // console.log(data)
        
        /* 보낸 사람을 제외한 나머지 유저에게 메시지 전송 */
        socket.broadcast.emit('update', data);
      })
    
      /* 접속 종료 */
      socket.on('disconnect', function() {
        console.log(socket.name + '님이 나가셨습니다.')
        let today = new Date(); 
    
        /* 나가는 사람을 제외한 나머지 유저에게 메시지 전송 */
        socket.broadcast.emit('update', {type: 'disconnect', message: socket.name + '님이 나가셨습니다.',today:`${today.format('a/p hh:mm')}`});
      })
    })


server.listen(port, () => {
    console.log(`server start port ${port}`)
})