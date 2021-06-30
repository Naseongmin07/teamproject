const { Employed, Portfolio } = require("../../models")

let interview =async (req,res)=>{
    // let interviewinfo = await Employed.findAll({
    //     attributes:[]
    // })
    
    res.render('job/interview.html')
}

let portfolio =async(req,res)=>{
    let portfoliores = await Portfolio.findAll({})
    res.render('job/portfolio.html',)
}

let recruit = async (req,res)=>{
    let recruitres = await Employed.findAll({})
    res.render('job/recruit.html')
}



module.exports ={
    recruit,
    interview,
    portfolio,
}