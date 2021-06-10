let history =(req,res)=>{
    res.render('college/history.html')
}

let interior =(req,res)=>{
    res.render('college/interior.html')
}

let introduction =(req,res)=>{
    res.render('college/introduction.html')
}

let location =(req,res)=>{
    res.render('college/location.html')
}

let teachers =(req,res)=>{
    res.render('college/teachers.html')
}


module.exports ={
    history,
    interior,
    introduction,
    location,
    teachers,
}