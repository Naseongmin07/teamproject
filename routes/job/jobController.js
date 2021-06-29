const { Employed } = require("../../models")

let interview =async (req,res)=>{
    let interviewinfo = await Employed.findAll({})
    console.log(interviewinfo[0].startDate)
    res.render('job/interview.html',{interviewinfo})
}

let portfolio =(req,res)=>{
    res.render('job/portfolio.html')
}

let recruit =(req,res)=>{
    res.render('job/recruit.html')
}



module.exports ={
    recruit,
    interview,
    portfolio,
}