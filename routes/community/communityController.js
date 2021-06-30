const { Community } = require("../../models")

let notice =(req,res)=>{
    res.render('community/notice.html')
}

let professor =async (req,res)=>{
    
    // let professorres = await Community.findAll({
    //     attributes = ['id', 'company', 'startDate', 'userIdx', 'count']
    // },{
    //     where:{
    //         subBoard:'교수칼럼'
    //     }
    // })
    
    res.render('community/professor.html')
}

let reporter = async (req,res)=>{
    let reporterres = await Community.findAll({

    },{where:{
        subBoard:'공지사항'
    }})
    res.render('community/reporter.html')
}

let review = async (req,res)=>{
    let reviewres = await Community.findAll({

    },{where:{
        subBoard:'수강후기'
    }})
    res.render('community/review.html')
}

let story = async (req,res)=>{
    let storyres = await Community.findAll({

    },{where:{
        subBoard:'K이야기'
    }})
    res.render('community/story.html')
}


module.exports ={
    notice,
    professor,
    reporter,
    review,
    story,
}