// const chatBtn = document.querySelector('#chatBtn');
// let userID
// let flag = undefined;
// let socket = io('http://localhost:3000');

let socket = io()

/* 접속 되었을 때 실행 */
socket.on('connect', function () {
  /* 이름을 입력받고 */
  let name = prompt('이름 입력해주세요.', '')
  console.log(typeof prompt)
  /* 이름이 빈칸인 경우 */
  if (!name) {
    name = '익명'
  }

  /* 서버에 새로운 유저가 왔다고 알림 */
  socket.emit('newUser', name)
})

/* 서버로부터 데이터 받은 경우 */
socket.on('update', function (data) {
  let chatRoom = document.querySelector('#chatRoom')

  let span = document.createElement('span')
  let message = document.createElement('p')
  let bigbox = document.createElement('div')
  let day = document.createTextNode(` ${data.today}`)
  let node = document.createTextNode(` ${data.message}`)
  let className = ''

  // 타입에 따라 적용할 클래스를 다르게 지정
  switch (data.type) {
    case 'message':
      className = 'you'
      toDay = 'youday'
      break

    case 'connect':
      className = 'connect'
      toDay = 'day'
      break

    case 'disconnect':
      className = 'disconnect'
      toDay = 'day'
      break
  }
  span.classList.add(toDay)
  span.appendChild(day)
  bigbox.appendChild(span)
  chatRoom.appendChild(bigbox)

  message.classList.add(className)
  message.appendChild(node)
  span.appendChild(message)
  chatRoom.appendChild(bigbox)


})

/* 메시지 전송 함수 */
function enterkey() {
  if (window.event.keyCode == 13) { // 엔터키가 눌렸을 때 } }
    send();
    console.log('AAA')
  }
}

function send() {

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
  String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };

  String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };

  Number.prototype.zf = function (len) { return this.toString().zf(len); };


  let today = new Date();

  // 입력되어있는 데이터 가져오기
  let message = document.querySelector('#msg').value

  // 가져왔으니 데이터 빈칸으로 변경
  document.querySelector('#msg').value = ''



  // 내가 전송할 메시지 클라이언트에게 표시
  let chatRoom = document.querySelector('#chatRoom')
  let msg = document.createElement('p')
  let box = document.createElement('div')
  let span = document.createElement('span')
  let node = document.createTextNode(message)
  let day = document.createTextNode(`${today.format('a/p hh:mm')}`)

  span.classList.add('meday')
  span.appendChild(day)
  box.appendChild(span)
  chatRoom.appendChild(box)

  msg.classList.add('me')
  msg.appendChild(node)
  span.appendChild(msg)
  chatRoom.appendChild(box)


  // 서버로 message 이벤트 전달 + 데이터와 함께
  socket.emit('message', { type: 'message', message: message, today: `${today.format('a/p hh:mm')}` })
}



let element = document.querySelector("#chatRoom");
element.scrollTop = element.scrollHeight;

function updateScroll(){
  let element = document.querySelector("#chatRoom");
  element.scrollTop = element.scrollHeight;
}
//once a second
setInterval(updateScroll,1000);

var scrolled = false;
function updateScroll(){
    if(!scrolled){
      let element = document.querySelector("#chatRoom");
        element.scrollTop = element.scrollHeight;
    }
}

$("#chatRoom").on('scroll', function(){
    scrolled=true;
});

// let height =0;
// let bottom_flag = true;
// let chatRoom = function(){
//   let chatRoom = document.querySelector('#chatRoom')
  
//   if((chatRoom.scrollTop+chatRoom.clientHeight)==chatRoom.scrollHeight){
//     bottom_flag = true;
//     // 채팅창 전체높이 + 스크롤 높이가 스크롤 전체높이와 같다면
//     // 이는 스크롤이 바닥을 향해있다는거
//     // 스크롤 바닥을 유지하도록 플래그 설정
//   }
//   if(height>chatRoom.scrollTop+chatRoom.clientHeight){
//     bottom_flag = false;
//     // 스크롤이 한번이라도 바닥이 아닌 위로 상승하는 액션이 발생할 경우
//     // 스코롤 바닥유지 플래그 해제
//   }
//   height = chatRoom.scrollTop+chatRoom.clientHeight
// };

// var app_chat_list = new Vue({
//   el: '#chatRoom',
//       data : function() {
//           return returnData;
//       },
//       updated : function() {
//           // app_chat_list 의 변화가 발생할때마다 수행되는 영역

//           let chatRoom = document.querySelector("#chatRoom");
//           if(bottom_flag){
//               // 채팅창 스크롤 바닥 유지
//               chatRoom.scrollTop = chatRoom.scrollHeight;
//           }
//       }
// });