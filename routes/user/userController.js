const e = require("express")
const { User } = require("../../models")
const createHash = require("../../chash")


let login = (req,res)=>{
    console.log(req.body)
    if(req.originalUrl=='/user/login'){
        res.render('./user/login.html')
    }
}
let join = (req,res)=>{
    res.render('./user/join.html')
}
let join_success = async (req,res)=>{   

    let {userid,userpw,class_team,pay,name,nickname,birth,gender,email,today,img,etc,onoff,portfolio, tel} = req.body    
        tel = tel.join('')
        console.log(tel)

    userpw = createHash(userpw)
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