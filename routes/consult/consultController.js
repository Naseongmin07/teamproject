let apply =(req,res)=>{
    res.render('consult/apply.html')
}

let consulting =(req,res)=>{
    res.render('consult/consulting.html')
}

let faq =(req,res)=>{
    res.render('consult/faq.html')
}


module.exports ={
    apply,
    consulting,
    faq,
}