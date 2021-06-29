const {Course} = require('../../models')



let curriculum = async (req,res)=>{
    let curriculumres = await Course.findAll({})
    console.log(curriculumres)
    res.render('curriculum/curriculum.html',{curriculumres})
}


module.exports ={
    curriculum,
}