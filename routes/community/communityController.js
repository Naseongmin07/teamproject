const {Test} = require('../../models');

let notice =  (req,res)=>{
    // const {idx,subject,name,today,hit} = req.query;
    res.render('community/notice.html') 

}

let load_notice = async (req,res)=>{

    let userlist = await Test.findAll({
        attributes:['id','subject','name','tooday','hit']
    })
    res.json({userlist})
}

let professor =(req,res)=>{
    res.render('community/professor.html')
}

let reporter =(req,res)=>{
    res.render('community/reporter.html')
}

let review =(req,res)=>{
    res.render('community/review.html')
}
let review_notice = async (req,res)=>{
    let userreview = await Test.findAll({
        attributes:['id','subject','name','tooday','hit']
    })
    res.json({userreview});
}
let story =(req,res)=>{
    res.render('community/story.html')
}


module.exports ={
    notice,
    professor,
    reporter,
    review,
    story,
    load_notice,
    review_notice,
}