
const { User } = require("../../models")
const createHash = require("../../chash.js")
const qs = require('qs')


let login = (req,res)=>{
    
    if(req.originalUrl=='/user/login'){
        res.render('./user/login.html')
    }
}
let join = (req,res)=>{
    res.render('./user/join.html')
}

let userid_check = async (req,res)=>{
    let {userIdx} = req.body

    let rst = await User.findOne({
        where : {userIdx},
    })

    if(rst==null){
        result = true
    }else{
        result = false
    }

    res.json({result})
}

let join_success = async (req,res)=>{   
  
    let {userid, userpw, class_team, pay, name, birth, gender, email, img, etc, portfolio, tel} = req.body    
    userpw = createHash(userpw)

    let rst = await User.create({
        userIdx: userid,
        userPsw: userpw,
        courseName: class_team,
        paycheck: pay,
        userName: name,
        userBirth: birth,
        gender: gender,
        email: email,
        userTel: tel,
        userImg: img,
        userEtc: etc,
        portfolio: portfolio,
        gender: gender,
    })   
   
    res.json(rst)      
}

let login_success = async (req,res)=>{   
    let {userid, psw}= req.body    
    let userpw = createHash(psw)
    let rst = await User.findOne({
        where:{userIdx : userid, 
               userPsw : userpw}
    })

    if(rst==null){
        result = false
    }else{
        result = true
    }
    res.json({result})
}

const kakao = {
    clientID: '9f482d6ce7a8fd8e80b3187a3dc7987a',
    clientSecret: 'rNbaGnUdxXpPUR4ZLspEoT61E1vgZGqV',
    redirectUri: 'http://localhost:3000/user/auth/kakao/callback',
}

let login_kakao = (req,res)=>{
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile,account_email`;
    res.redirect(kakaoAuthURL)
}



//profile account_email
let login_kakao_callback = async (req,res)=>{
    const {session,query} = req;
    const {code} = query
    let token

    try{
    token = await axios({
        method: 'POST',
        url: 'https://kauth.kakao.com/oauth/token',
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        }, // npm install qs
        data:qs.stringify({
            grant_type:'authorization_code', // 특정 스트링 
            client_id:kakao.clientID,
            client_secret:kakao.clientSecret,
            redirectUri:kakao.redirectUri,
            code: code
        }) // 객체를 String으로 변환.
    })
    } catch(err){
        res.json(err.data)
    }


    let user;
    try{
        user = await axios({
            method:'GET',
            url:'https://kapi.kakao.com/v2/user/me',
            headers:{
                Authorization: `Bearer ${token.data.access_token}`
            }
        })
    } catch(err){
        res.json(err.data)
    }


    const authData = {
        ...token.data,
        ...user.data,
        // 깊은 복사
        // 이후에 원본의 값이 변하여도 복사시점의 값을 이용
    }
    session.authData = {
        ['kakao']:authData,
    }
    //console.log('===========================================================================================================',session);
    res.redirect('/')
}




module.exports = {
    login:login,
    join:join,
    join_success:join_success,
    login_success: login_success,
    userid_check : userid_check,
    login_kakao:login_kakao,
    login_kakao_callback:login_kakao_callback,
}