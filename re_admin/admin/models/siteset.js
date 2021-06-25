const Sequelize = require('sequelize')

module.exports = class Siteset extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            siteName:{
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            siteUrl:{
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            title:{
                type:Sequelize.STRING(30),
                allowNull:true,                
            },
            CEOemail:{
                type:Sequelize.STRING(60),
                allowNull:true,
            }
        },{
           sequelize,
           Timestamps:false,
           underscored:false,
           modelName:'Siteset',
           tableName:'sitesets',
           paranoid:false,
           charset:'utf8',
           collate:'utf8_general_ci' 
        })
    }
}