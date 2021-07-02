let interview =(req,res)=>{
    res.render('job/interview.html')
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