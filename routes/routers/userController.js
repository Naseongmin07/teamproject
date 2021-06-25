const {Adminlist, Submain,User,Facility,Community,Course, Employed, Portfolio,Mainvisual,Visitor, Siteset, Coinfo,Main} = require('../../models')
const pwHash = require('../../chash.js')
const ctoken = require('../../jwt.js')
const {sequelize} = require('../../models/index.js')
const { watch } = require('chokidar')
const { renderString } = require('nunjucks')
const multer = require('multer')
const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,callback){
            callback(null,'uploads')
        },
        filename:function(req,file,callback){
            callback(null,new Date().valueOf()+path.extname(file.originalname))
        }
    })
})


let admin_main = async (req,res)=>{
    let {topmenu,submenu} = req.query
    let subboard = await Submain.findAll({where:{mainBoard:`${topmenu}`}})
    let onesubboard = await Submain.findAll({where:{subBoard:`${submenu}`}})
    if(req.query.submenu==undefined){
        let totalcontents = await Community.findAll({})
        console.log(totalcontents)
    }
        switch(topmenu){            
            case 'administrator':
                let adminList = await Adminlist.findAll({})
                let boardres = await Submain.findAll({})
                let boardgroupres = await Submain.findAll({})
                let resu = await User.findAll({})
                let main_img = await Mainvisual.findAll({where:{watchaut:1}})
                let hidden_img = await Mainvisual.findAll({where:{watchaut:0}})
                let Coinfores = await Coinfo.findOne({where:{id:1}})
                let Sitesetres = await Siteset.findOne({where:{id:1}})
                let mainBoardtitle = await Main.findAll({})                
                res.render('./admin_list.html',{topmenu,main_img,hidden_img,subboard,topmenu,submenu,adminList,boardres,boardgroupres,resu,Coinfores,Sitesetres,mainBoardtitle})
                break;
            case '시설소개':
                let facility_img = await Facility.findAll({})
                let result = await Facility.findAll({where:{subboard:`${submenu}`}})
                res.render('./facility.html',{topmenu,facility_img,topmenu,subboard,onesubboard,result})
                break;
            case '커뮤니티':
                console.log(req.query.submenu,',============================')
                //let totalres = await Community.findAll({})
                
                    resuu = await Community.findAll({where:{subBoard:`${submenu}`}})
                res.render('./community.html',{subboard,onesubboard,resuu,topmenu})
                break;
            case '교육과정':
                
                let resuuu = await Course.findAll({})
                res.render('./course.html',{topmenu,subboard,onesubboard,resuuu})
                break;
            case '취업정보':
                let Employee = await Employed.findAll({})
                let portfolio = await Portfolio.findAll({})                
                res.render('./employ.html',{topmenu,subboard,onesubboard,Employee,portfolio,submenu})
                break;
            case '상담신청':
                res.render('./topmenu.html',{topmenu,subboard,onesubboard})
                break;
            case '방문자정보':
                res.render('./visitor.html',{topmenu,subboard,onesubboard})
                break;
        }
}  

let siteset = async (req,res)=>{
    if(req.query.location=='basic_info'){
        console.log(req.body)
        let {siteName,siteUrl,title,CEOemail} = req.body
        await Siteset.update({siteName,siteUrl,title,CEOemail},{where:{id:1}})
    }else if(req.query.location=='company_info'){
        let{CRN,CEOName,Contel,CompanySite} = req.body
        await Coinfo.update({CRN,CEOName,Contel,CompanySite},{where:{id:1}})
    }
    console.log(req.body)
    res.redirect('/admin/login_on?topmenu=administrator&submenu=사이트환경설정')
}
let board_group_get = async (req,res)=>{
    let {idxx} = req.query
    let selectedgroupres = await Submain.findAll({where:{subBoard:idxx}})
    res.render('./board_group.html',{selectedgroupres,idxx})
}

let main_form = async (req,res)=>{
    let idxx = req.body.idx
    let psww = req.body.psw
    let hashedpsw = pwHash(psww)
    console.log(hashedpsw)
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
        req.session.level = resu.level
        req.session.idx = resu.idx
        //res.session.uid = resu.idx
        topmenu = "administrator"
        res.render('./admin_list.html',{resu,topmenu})
    }catch(e){
        console.log(e)
        res.send('해당하는 사용자가 존재하지 않습니다.')
    }
}

let board_make_post = async (req,res)=>{
    let {tableName,mainBoard,subBoard} = req.body
    await Submain.create({tableName,mainBoard,subBoard}) 
    res.redirect('/admin/login_on?topmenu=administrator&submenu=게시판생성관리')
}

let board_manage_post = async (req,res)=>{
    //console.log(req.cookies.AccessToken)
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
        res.redirect('/admin/login_on?topmenu=administrator&submenu=게시판생성관리')
    }
    res.redirect('/admin/login_on?topmenu=administrator&submenu=게시판생성관리')
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
                res.render('./admin_list.html',{resu,topmenu:'administrator',submenu:'관리자리스트',adminList})
            }else if(req.body.search_condition_m=="class_name"){
                let resu = await Adminlist.findOne({
                    where:{
                        idx:req.body.value
                    }
                })
                res.render('./admin_list.html',{resu,main,adminList,topmenu:'administrator',submenu:'관리자리스트'})
            };
            break;
        case 'admin_add':
            try{
                let {name,idx,psw,birth,courseName,level,tel,startDate,email,img} = req.body
                psw = pwHash(psw)
                await Adminlist.create({name,idx,psw,birth,courseName,level,tel,startDate,email,img})
                res.redirect('/admin/login_on?topmenu=administrator&submenu=관리자리스트')
                break;
            }catch(e){
                res.render('./error.html',{error:'관리자아이디동일'})
            }
        case 'admin_manage':
            if(req.body.delete=='삭제'){
                await Adminlist.destroy({
                    where:{
                        idx:req.body.Idx
                    }
                })
                res.redirect('/admin/login_on?topmenu=administrator&submenu=관리자리스트')
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
                res.redirect('/admin/login_on?topmenu=administrator&submenu=관리자리스트')               
            }
    }
}

let user_list = async (req,res)=>{
    let {location} = req.query
    let main = '사용자관리'
    
    switch (location){
        case 'add_user':
            try{
            let {userName,userIdx,userPsw,courseName,paycheck,userBirth,created_at,userTel,userAddress,employmentStatus,userEtc,userImg} = req.body
            await User.create({userName,userIdx,userPsw,courseName,paycheck,userBirth,created_at,userTel,userAddress,employmentStatus,userEtc,userImg})
            res.redirect('/admin/login_on?topmenu=administrator&submenu=사용자관리')
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
               if(searched.employmentStatus==0){
                    res.render('./admin_list.html',{searched,main,topmenu:'administrator',submenu:'사용자관리',emlploy0:'checked'})
               }else if(searched.employmentStatus==1){
                res.render('./admin_list.html',{searched,main,topmenu:'administrator',submenu:'사용자관리',employ1:'checked'})
               }
               
            }else if(req.body.search_condition_m=="courseName"){
                let searched = await User.findOne({
                    where:{
                        courseName:req.body.value
                    }
                })
                if(searched.employmentStatus==0){
                    res.render('./admin_list.html',{searched,main,topmenu:'administrator',submenu:'사용자관리',emlploy0:'checked'})
               }else if(searched.employmentStatus==1){
                res.render('./admin_list.html',{searched,main,topmenu:'administrator',submenu:'사용자관리',employ1:'checked'})
               }
               
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
                            userImg:uImg,                        
                        },{
                            where:{
                                id:idx
                            }
                        })
                        res.redirect('/admin/login_on?topmenu=administrator&submenu=사용자관리')
                        //console.log(userEtc,ucreated_at,uImg,uTel,uBirth,uName,uCoursename,uAddress,uPaycheck)
                    }else if(req.body[i]=='삭제'){
                        idx = req.body.numbercheck[i]
                        await User.destroy({
                            where:{
                                id:idx
                            }
                        })
                        res.redirect('/admin/login_on?topmenu=administrator&submenu=사용자관리')
                    }
                }
                break;
            }catch(e){
                console.log(e)
                res.render('./error.html',{error:'잘못된사용자정보'})
            }            
    }
}


let community_write = async (req,res)=>{
    res.render('./communitywrite.html')
}

let community_write_post = async (req,res)=>{
    let {mainBoard,subBoard,title,contents,file,img,writeaut,readaut,replyaut,idx,writer} = req.body
    await Community.create({idx,writer,mainBoard,subBoard,title,contents,file,img,writeaut,readaut,replyaut})
    let resuuu = await Community.findAll({})
    //res.render('./community.html',{resu})
    res.redirect('/admin/login_on?topmenu=커뮤니티')
}

let img_del = async (req,res) =>{
    //console.log(req.body.id,'=======================================')
    await Facility.destroy({where:{
        id:req.body.id
    }})
    res.redirect('/admin/login_on?topmenu=시설소개')
}

let main_img_del = async (req,res)=>{
    console.log(req.body.del)
    console.log(req.body.move)
    if(req.body.del=="삭제"){
        //console.log('삭제')
        await Mainvisual.destroy({where:{
            id:req.body.idx
        }})
    }else if(req.body.move=="이동"){
        //console.log('이동')
        await Mainvisual.update({watchaut:0},{where:{id:req.body.idx}})
    }
    
    res.redirect('/admin/login_on?topmenu=administrator&submenu=메인비쥬얼보임')
}
let hidden_img_del = async (req,res)=>{
    if(req.body.del=="삭제"){
        //console.log('삭제')
        await Mainvisual.destroy({where:{
            id:req.body.idx
        }})
    }else if(req.body.move=="이동"){
        //console.log('이동')
        await Mainvisual.update({watchaut:1},{where:{id:req.body.idx}})
    }
    
    res.redirect('/admin/login_on?topmenu=administrator&submenu=메인비쥬얼보임')
}

let course_form = (req,res)=>{
    console.log(req.body)
    //res.redirect('/admin/login_on?topmenu=교육과정')
    res.render('./course_write.html')
}

let course_write = (req,res)=>{
    res.render('./course_write.html')
} 

let course_write_post = async (req,res)=>{
    let {courseName,name,img,coursetype,idx,head_count,startDate,endDate,contents,starttime,endtime,tag,support,description,onoff} = req.body
    console.log(courseName,name,img,coursetype,idx,head_count,startDate,endDate,contents,starttime,tag,support,description,onoff)
    await Course.create({courseName,name,img,coursetype,idx,head_count,startDate,endDate,contents,starttime,endtime,tag,support,description,onoff})
    res.redirect(`/admin/login_on?topmenu=교육과정&submenu=${courseName}`)
}
let add_employee = async (req,res)=>{
    let Employee = await Employed.findAll({})
    let subboard = await Submain.findAll({where:{mainBoard:'취업정보'}})
    res.render('./employeewrite.html',{sub:'취업정보',subboard,Employee})
}

let add_portfolio = async (req,res)=>{
    let portfolio = await Portfolio.findAll({})
    let subboard = await Submain.findAll({where:{mainBoard:'취업정보'}})
    res.render('./employeewrite.html',{sub:'포트폴리오',subboard,portfolio})
}

let employed_suc = async (req,res)=>{
    let {userName,userIdx,courseName,count,contents,img,company} = req.body 
    await Employed.create({userName,userIdx,courseName,count,contents,img,company})
    let Employee = await Employed.findAll({})
    console.log('------------------------------------')
    console.log(Employee)
    res.render('./employ.html',{submenu:'취업정보',Employee})
}

let portfolio_suc = async (req,res)=>{
    let {userName,title,userIdx,contents,count,img} = req.body 
    await Portfolio.create({userName,title,userIdx,contents,count,img})
    let portfolio = await Portfolio.findAll({})
    res.render('./employ.html',{submenu:'포트폴리오',portfolio})
}

let main_img = async (req,res)=>{
    let {url,watchaut} = req.body
    let image = req.file.filename
    await Mainvisual.create({image,url,watchaut})
    res.redirect('/admin/login_on?topmenu=administrator&submenu=메인비쥬얼보임')
}

let community_del = async (req,res)=>{
    await Community.destroy({where:{id:req.body.idd}})
    let ressss = Community.findAll({})
    
    // await Community.destroy({where:{id:req.body.idd}})
    res.redirect('/admin/login_on?topmenu=커뮤니티')
}

let visitor_info = async (req,res)=>{
    let re = req.body.date
    let {currentURL,exURL,userAgent,userLanguage,webwidth,webHeight} = req.body
    await Visitor.create({currentURL,exURL,userAgent,userLanguage,webwidth,webHeight})
    let visitorres = await Visitor.findAll({
        where: sequelize.where(sequelize.fn('date', sequelize.col('time')), '=', `${re}`)
       
    })
    //console.log(visitorres)
    res.render('./visitor_info.html',{visitorres})
}
let mainboard_group = async (req,res)=>{
    let mainboardtitle = req.body.mainBoard_select
    if(req.body.search=="검색"){
        let selectedSub = await Submain.findAll({where:{mainBoard:mainboardtitle}})
        res.render('./admin_list.html',{topmenu:'administrator',submenu:'게시판그룹관리',selectedSub})
    }else if(req.body.modify=="수정"){
        let modifiedSub = await Submain.findAll({where:{mainBoard:mainboardtitle}})
        res.render('./admin_list.html',{topmenu:'administrator',submenu:'게시판그룹관리',modifiedSub})
    }
    
    
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
    img_del,
    course_form,
    course_write,
    course_write_post,
    add_employee,
    add_portfolio,
    employed_suc,
    portfolio_suc,
    board_group_get,
    main_img,
    community_del,
    visitor_info,
    siteset,
    mainboard_group,
    main_img_del,
    hidden_img_del
}