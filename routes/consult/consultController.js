
const { User , Apply, Consult} = require("../../models")


let apply =(req,res)=>{
    res.render('consult/apply.html')
}

let consulting =(req,res)=>{
    res.render('consult/consulting.html')
}

let faq =(req,res)=>{
    res.render('consult/faq.html')
}

let user_consulting = async (req,res)=>{

    let rst = await Consult.create(req.body)   
   
    res.json(rst)      
}

let user_apply = async (req,res)=>{

    let rst = await Apply.create(req.body)   
   
    res.json(rst)      
}


module.exports ={
    apply,
    consulting,
    faq,
    user_apply,
    user_consulting,
}