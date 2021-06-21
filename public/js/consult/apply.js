const email_domain = document.querySelector('#email_domain')
function onchangeFn(){
    let email_select = document.querySelector('#email_select')
    if(email_select.value == "직접입력"){
        email_domain.focus()
        return
    }
    email_domain.value = email_select.value
}


const agreement = document.querySelector('.board_article > label > input')
const board_apply = document.querySelectorAll('.board_apply > input')
const board_name = document.querySelector('.board_name > input')
const board_gender = document.querySelector('.board_gender > input')
const board_age = document.querySelector('.board_age > input')
const board_email = document.querySelectorAll('.board_email > input')
const board_tel = document.querySelectorAll('.board_tel > input')
const board_content = document.querySelector('.board_content > textarea')
const btn_blue = document.querySelector('.btn_blue')


btn_blue.addEventListener('click',()=>{
    let apply_name_value
    board_apply.forEach(v=>{
        if(v.checked){
            apply_name_value = v.value
        }
    })
    let board_name_value = board_name.value
    let board_email_value = `${board_email[0].value}@${board_email[1].value}`
    let board_gender_value = board_gender.value
    let board_age_value = board_age.value
    let board_tel_value = `${board_tel[0].value}-${board_tel[1].value}-${board_tel[2].value}`
    let board_content_value = board_content.value

})