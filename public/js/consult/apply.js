const email_domain_select = document.querySelector('#email_domain')
function onchangeFn(){
    let email_select = document.querySelector('#email_select')
    if(email_select.value == "직접입력"){
        email_domain_select.focus()
        return
    }
    email_domain.value = email_select.value
}


const btn_blue = document.querySelector('.btn_blue')
const agreement = document.querySelector('.agreement')
const gender = document.querySelector('.gender')
const board_content = document.querySelector('.board_content > textarea')
const name = document.querySelector('.input_name')
const age = document.querySelector('.input_age')
const email_domain = document.querySelector('.email_domain')
const email_adress = document.querySelector('.email_adress')
const mobile = document.querySelectorAll('.board_tel > input')
const board_apply = document.querySelectorAll('.board_apply > input')


btn_blue.addEventListener('click', async ()=>{

    let obj = {}

    if(agreement.checked == true){
        alert('약관에 동의해주세요')
        return
    }

    for(i=0; i < board_apply.length; i++){
        if(board_apply[i].checked==true){
            obj.coursetype = board_apply[i].value
        }
    }

    let mobile_number = ''
    for(i=0; i<mobile.length; i++){
        if(mobile[i].value == ''){
            alert('핸드폰 번호를 입력해주세요')
            return
        }
        mobile_number += mobile[i].value
    }

    if(name.value==''){
        alert('이름을 입력해주세요')
        return
    }

    if(email_adress.value==''|email_domain.value==''){
        alert('이메일을 입력해주세요')
        return
    }

    if(board_content.value==''){
        alert('상담내용을 입력해주세요')
        return
    }

    obj.gender = gender.checked
    obj.name = name.value
    obj.email = `${email_adress.value}-${email_domain.value}`
    obj.tel = mobile_number
    obj.etc = board_content.value
    
    let url = "http://localhost:3000/consult/user/apply"

    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    }

    let response = await fetch(url, options)
    alert('게시글이 등록되었습니다')
    window.location.href = "http://localhost:3000/consult/apply"

})