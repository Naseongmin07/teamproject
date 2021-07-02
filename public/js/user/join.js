const submitBtn = document.querySelector('#submit_button')
const userId = document.querySelector('.userid')
const useridCheck = document.querySelector('.useridcheck')


let flag = false
useridCheck.addEventListener('click', async ()=>{

    let userIdx = userId.value
    let url = 'http://localhost:3000/user/useridcheck'
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userIdx: userIdx
          })
    }
    let response = await fetch(url, options)
    let result = await response.json()
    if(result.result == false){
        alert('중복된 아이디입니다.')
        return
    }else{
        alert('사용가능한 아이디입니다.')
        flag = true
    }
})

let text_list = ['아이디', 'class', '가격', '비밀번호', '비밀번호', '이름', '닉네임', 'email', '생년월일'] 

submitBtn.addEventListener('click', async ()=>{

    let inputBox = document.querySelectorAll('.input_box')
    let telBox = document.querySelectorAll('#tel')
    let etc = document.querySelector('#etc')
    let gender = document.querySelector('#male')
    let telnumber = ''
    let obj = {}
    let userpw
    if(flag == false){
        alert('아이디 중복 체크를 해주세요')
        return
    }

    for(i=0; i<inputBox.length; i++){

        if(inputBox[i].value == ""){
            alert(`${text_list[i]} 값을 채워주세요`)
            return
        }
        
        if(inputBox[i].name == "userpw"){
            userpw = inputBox[i].value
            
        }
        if(inputBox[i].name == "userpwcheck"){
            userpwcheck = inputBox[i].value
            if(userpw != userpwcheck){
                alert('비밀번호가 일치하지 않습니다')
                return
            }
        }
        if(inputBox[i].name == "email"){
            try{
                inputBox[i].value.match(/(@)/gi).length
            }catch(e){
                alert('이메일 양식을 확인하세요')
                return
            }
        }
        console.log(inputBox[i].name, inputBox[i].value)
        obj[inputBox[i].name] = inputBox[i].value
    }
    for(i=0; i<telBox.length; i++){

        telnumber += telBox[i].value

    }
    obj['tel'] = telnumber 
    obj['etc'] = etc.value
    obj['gender'] = gender.checked

    let url = 'http://localhost:3000/user/join/success'
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)s
    }
    let response = await fetch(url, options)
    let result = await response.json()
    

    alert('회원가입에 성공하셨습니다')

    window.location.href = "http://localhost:3000/user/login"
})