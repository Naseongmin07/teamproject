
const {Test} = require('../../models');

let interview =  (req,res)=>{

    res.render('job/interview.html')
}
let interviewPost = async (req,res)=>{
   
//     let img = req.file == undefined ? '' : req.file.path.replace('public\\','');
//     console.log(img)
//     try{ 
//     let ret = await Test.create({
//         img,
//         idx:'11',
//         title:'네이버',
//         writer:'작심삼시세끼',
//         count:'010201',
//         category:'aasd',
//         contents:'qrqr',
//         file:'sdsdf',
//         subcategory:'adadas'
//     })
// }catch(e){
//     console.log(e)
// }

     let resultlist = await Test.findAll({
        attributes:['img','title','writer','count']
     })
    res.json({resultlist})
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
    interviewPost,
}