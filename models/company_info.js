const Sequelize = require('sequelize')

module.exports = class Coinfo extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            CRN:{// 사업자등록번호
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            CEOName:{
                type:Sequelize.STRING(20),
                allowNull:false,
            },
            Contel:{
                type:Sequelize.STRING(30),
                allowNull:true,                
            },
            CompanySite:{
                type:Sequelize.STRING(60),
                allowNull:true,
            }
        },{
           sequelize,
           Timestamps:false,
           underscored:false,
           modelName:'Coinfo',
           tableName:'coinfos',
           paranoid:false,
           charset:'utf8',
           collate:'utf8_general_ci' 
        })
    }
}