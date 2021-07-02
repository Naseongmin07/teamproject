let notice =(req,res)=>{
    res.render('community/notice.html')
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

let story =(req,res)=>{
    res.render('community/story.html')
}


module.exports ={
    notice,
    professor,
    reporter,
    review,
    story,
}