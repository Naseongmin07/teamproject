const userId = document.querySelector('.userid')
const userPw = document.querySelector('.userpw')
const loginBtn = document.querySelector('#login_button')
const headerLogin = document.querySelector('.header_login')
const loginKakao = document.querySelector('.login_kakao')

loginBtn.addEventListener('click', async ()=>{

    let userid = userId.value
    let userpw = userPw.value

    let url = 'http://localhost:3000/user/login/success'
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userid : userid,
            psw : userpw
          })
    }
    let response = await fetch(url, options)
    let result = await response.json()
    console.log(result)
    if(result.result == false){
        alert('아이디와 비밀번호를 확인하세요')
        return
    }
    headerLogin.innerHTML = '로그아웃'
    window.location.href = "http://localhost:3000/"
})



