const {Adminlist, Submain,User,Facility,Community} = require('../../models')
const pwHash = require('../../createHash.js')
const ctoken = require('../../jwt.js')
const {sequelize} = require('../../models/index.js')
const { watch } = require('chokidar')

let admin_main = async (req,res)=>{
    let {main} = req.query
    if(req.query.main){
        switch(main){
            case '관리자리스트':
                let adminList = await Adminlist.findAll({})
                res.render('./admin_list.html',{main,adminList})
                break;
            case '사이트환경설정':
                res.render('./admin_list.html',{main})
                break;
            case '게시판생성관리':
                let boardres = await Submain.findAll({})
                res.render('./admin_list.html',{main,boardres})
                break;
            case '게시판그룹관리':
                res.render('./admin_list.html',{main})
                break;
            case '팝업관리':
                res.render('./admin_list.html',{main})
                break;
            case '메인비주얼보임':
                res.render('./admin_list.html',{main})
                break;
            case '메인비주얼숨김':
                res.render('./admin_list.html',{main})
                break;
            case '메인비쥬얼숨김':
                res.render('./admin_list.html',{main})
                break;
            case '사용자관리':
                let resu = await User.findAll({})
                res.render('./admin_list.html',{main,resu})
                break;
        }
    }else if(req.query.topmenu){
        let {topmenu,submenu} = req.query
        console.log(submenu)
        let subboard = await Submain.findAll({where:{mainBoard:`${topmenu}`}})
        let onesubboard = await Submain.findAll({where:{subBoard:`${submenu}`}})
        switch (topmenu){
            case 'administrator':
                res.render('./admin_list.html',{main:'관리자리스트'})
                break;
            case '시설소개':
                let result = await Facility.findAll({})
                res.render('./facility.html',{topmenu,subboard,onesubboard,result})
                break;
            case '커뮤니티':
                let resu = await Community.findAll({})
                res.render('./community.html',{subboard,onesubboard,resu})
                break;
            case '교육과정':
                res.render('./course.html',{subboard,onesubboard})
                break;
            case '취업정보':
                res.render('./topmenu.html',{subboard,onesubboard})
                break;
            case '상담신청':
                res.render('./topmenu.html',{subboard,onesubboard})
                break;
            case '방문자정보':
                res.render('./topmenu.html',{subboard,onesubboard})
                break;
        }
    }
}

let main_form = async (req,res)=>{
    let idxx = req.body.idx
    let psww = req.body.psw
    let hashedpsw = pwHash(psww)
    try{
        let resu = await Adminlist.findOne({
            where:{
                idx:idxx,
                psw:hashedpsw
            }
        })
        let token = ctoken(idxx)
        res.cookie('AccessToken',token,{})
        req.session.uid = {["local"]:resu.idx}
        res.session.level = resu.level
        main = "관리자리스트"
        res.render('./admin_list.html',{resu,main})
    }catch(e){
        console.log(e)
        res.send('해당하는 사용자가 존재하지 않습니다.')
    }
}

let board_make_post = async (req,res)=>{
    let {tableName,mainBoard,subBoard,url,contentType,watchaut,writeaut,replyaut} = req.body
    await Submain.create({tableName,mainBoard,subBoard,url,contentType,watchaut,writeaut,replyaut}) 
    res.redirect('/admin/login_on?main=게시판생성관리')
}

let board_manage_post = async (req,res)=>{
    try{
        let num = ((req.body.numbercheck).length)
        for(i=0;i<=num;i++){
            if(req.body[i]=='수정'){
                let tableNameR = req.body.tableName[i]       
                let subBoardR = req.body.subBoard[i]
                let watchautR = req.body.watchaut[i]
                let writeautR = req.body.writeaut[i]
                let replyautR = req.body.replyaut[i]
                let mainBoardR = req.body.mainBoard[i]
                let contentTypeR = req.body.content[i]
                idx = req.body.numbercheck[i]
                await Submain.update({
                    mainBoard:mainBoardR,
                    tableName:tableNameR,
                    subBoard:subBoardR,
                    watchaut:watchautR,
                    writeaut:writeautR,
                    replyaut:replyautR,
                    contentType:contentTypeR
                },{
                    where:{
                        id:idx
                }
                })
            }else if(req.body[i]=='삭제'){
                idx = req.body.numbercheck[i]
                await Submain.destroy({
                    where:{
                        id:idx
                    }
                })
            }            
        }
    }catch(e){
        res.redirect('/admin/login_on?main=게시판생성관리')
    }
    res.redirect('/admin/login_on?main=게시판생성관리')
}

let admin_list = async (req,res)=>{
    
    let {location} = req.query
    let main = '관리자리스트'
    let adminList = await Adminlist.findAll({})
    switch (location){
        case 'search':
            if(req.body.search_condition_m=="name"){
                let resu = await Adminlist.findOne({
                    where:{
                        name:req.body.value
                    }
                })               
                res.render('./admin_list.html',{resu,main,adminList})
            }else if(req.body.search_condition_m=="class_name"){
                let resu = await Adminlist.findOne({
                    where:{
                        idx:req.body.value
                    }
                })
                res.render('./admin_list.html',{resu,main,adminList})
            };
            break;
        case 'admin_add':
            try{
                let {name,idx,psw,birth,courseName,level,tel,startDate,email,img} = req.body
                psw = pwHash(psw)
                await Adminlist.create({name,idx,psw,birth,courseName,level,tel,startDate,email,img})
                res.redirect('/admin/login_on?main=관리자리스트')
                break;
            }catch(e){
                res.render('./error.html',{error:'관리자아이디동일'})
            }
        case 'admin_manage':
            if(req.body.delete=='삭제'){
                await Adminlist.destroy({
                    where:{
                        idx:req.body.idx
                    }
                })
                res.redirect('/admin/login_on?main=관리자리스트')
            }else if(req.body.modify=='수정'){
                let {Name,Level,Idx,Tel,Email,StartDate} = req.body
                await Adminlist.update({
                    name:Name,
                    idx:Idx,
                    level:Level,
                    tel:Tel,
                    email:Email,
                    startDate:StartDate
                },{
                    where:{
                        idx:req.body.Idx
                    }
                })
                res.redirect('/admin/login_on?main=관리자리스트')               
            }
    }
}

let user_list = async (req,res)=>{
    let {location} = req.query
    let main = '사용자관리'
    
    switch (location){
        case 'add_user':
            try{
            let {userName,userIdx,userPsw,courseName,paycheck,userBirth,created_at,userTel,userAddress,employmentStatus,portfolio,userEtc,userImg} = req.body
            await User.create({userName,userIdx,userPsw,courseName,paycheck,userBirth,created_at,userTel,userAddress,employmentStatus,portfolio,userEtc,userImg})
            res.redirect('/admin/login_on?main=사용자관리')
            break;
            }catch(e){
                res.render('./error.html',{error:'잘못된사용자정보'})
            }
        case 'search_user':
            try{
            if(req.body.search_condition_m=='name'){
               let searched = await User.findOne({
                   where:{
                       userName:req.body.value
                   }
               })
                res.render('./admin_list.html',{searched,main})
            }else if(req.body.search_condition_m=="course_name"){
                let searched = await User.findOne({
                    where:{
                        courseName:req.body.value
                    }
                })
                res.render('./admin_list.html',{searched,main})
            };
            break;
        }catch(e){
            res.render('./error.html',{error:'잘못된사용자검색'})
        }
        case 'manage_user':
            try{
                let num = ((req.body.numbercheck).length)-1
                for(i=0;i<=num;i++){
                    if(req.body[i]=='수정'){
                        let uName = req.body.uName[i]
                        let uCoursename = req.body.uCoursename[i]
                        let uBirth = req.body.uBirth[i]
                        let uPaycheck = req.body.uPaycheck[i]
                        let ucreated_at = req.body.ucreated_at[i]
                        let uTel = req.body.uTel[i]
                        let uAddress = req.body.uAddress[i]
                        let userEtc = req.body.userEtc[i]
                        let uImg = req.body.uImg[i]
                        idx = req.body.numbercheck[i]
                        await User.update({
                            userName:uName,
                            courseName:uCoursename,
                            paycheck:uPaycheck,
                            userBirth:uBirth,
                            created_at:ucreated_at,
                            userTel:uTel,
                            userAddress:uAddress,
                            userEtc:userEtc,
                            userImg:uImg
                        },{
                            where:{
                                id:idx
                            }
                        })
                        res.redirect('/admin/login_on?main=사용자관리')
                        //console.log(userEtc,ucreated_at,uImg,uTel,uBirth,uName,uCoursename,uAddress,uPaycheck)
                    }else if(req.body[i]=='삭제'){
                        idx = req.body.numbercheck[i]
                        await User.destroy({
                            where:{
                                id:idx
                            }
                        })
                        res.redirect('/admin/login_on?main=사용자관리')
                    }
                }
                break;
            }catch(e){
                res.render('./error.html',{error:'잘못된사용자정보'})
            }            
    }
}

// let category_select = async (req,res)=>{
//     let {topmenu,submenu} = req.query
//     switch (topmenu){
//         case '커뮤니티':
//             let onesubboard = await Submain.findOne({where:{subBoard:submenu}})
//             res.render('./topmenu.html',{onesubboard,topmenu,submenu})
//             break
//     }
//     console.log(topmenu,submenu,'========================')
    
// }
let community_write = async (req,res)=>{
    res.render('./communitywrite.html')
}

let community_write_post = async (req,res)=>{
    let {mainBoard,subBoard,title,contents,file,img,writeaut,readaut,replyaut,idx,writer} = req.body
    await Community.create({idx,writer,mainBoard,subBoard,title,contents,file,img,writeaut,readaut,replyaut})
    let resu = await Community.findAll({})
    res.render('./community.html',{resu})
}

let img_del = async (req,res) =>{
    console.log(req.body)
    await Facility.destroy({where:{
        id:req.body.id
    }})
    res.redirect('/admin/login_on?topmenu=시설소개')
}

module.exports = {
    admin_main,
    main_form,
    board_make_post,
    board_manage_post,
    admin_list,
    user_list,
    community_write,
    community_write_post,
    img_del
    //category_select
}