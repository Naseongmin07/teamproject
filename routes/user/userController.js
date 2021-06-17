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
    let {userid,userpw,class_team,pay,name,nickname,birth,gender,email,today,img,etc,onoff,portfolio} = req.body    
    let tel = req.body.tel
        tel = tel.replace('-','').replace('-','')
        console.log(tel)
    // let today = new Date().toLocaleDateString()

    try{
        let rst = await User.create({
            userid,userpw,class_team,pay,name,nickname,birth,gender,email,today,tel,img,etc,onoff,portfolio
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