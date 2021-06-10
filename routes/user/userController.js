const e = require("express")
const { User } = require("../../models")


let login = (req,res)=>{
    console.log(req.originalUrl)
    if(req.originalUrl=='/user/login'){
        res.render('./user/login.html')
    }
}
let join = (req,res)=>{
    res.render('./user/join.html')
}
let join_success = async (req,res)=>{   
   // console.log(req.body)
    let {idx,psw,name,birth,gender} = req.body    
    let tel = req.body.tel
        tel = tel.replace('-','').replace('-','')
        console.log(tel)
    let created_at = new Date().toLocaleDateString()
    let img = 'img'
    let email = 'email'   

    try{
        let rst = await User.create({
            idx,psw,name,birth,gender,created_at,tel,img,email
        })        
    }catch(e){
        console.log('error',e)
    }
    res.redirect('/')
}



module.exports = {
    login:login,
    join:join,
    join_success:join_success
}