const { Facility } = require("../../models")

let history = async (req,res)=>{
    let historyinfo = await Facility.findOne({where:{subboard:'연혁'}})
    res.render('college/history.html',{historyinfo})
}

let interior =async(req,res)=>{
    let interiorimg = await Facility.findAll({where:{subboard:'시설소개'}})
    res.render('college/interior.html',{interiorimg})
}

let introduction = async (req,res)=>{
    let introinfo = await Facility.findOne({where:{subboard:'인사말'}})
    res.render('college/introduction.html',{introinfo})
}

let location =(req,res)=>{
    res.render('college/location.html')
}

let teachers = async (req,res)=>{
    let teacherinfo = await Facility.findAll({where:{subboard:'교직원소개'}})
    res.render('college/teachers.html',{teacherinfo})
}


module.exports ={
    history,
    interior,
    introduction,
    location,
    teachers,
}