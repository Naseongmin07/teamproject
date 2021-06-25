const Sequelize = require('sequelize')

module.exports = class Main extends Sequelize.Model{
    static init(sequelize){
        return super.init({            
            mainBoard:{
                type:Sequelize.STRING(30),
                allowNull:false,
            },
            subBoard:{
                type:Sequelize.STRING(30),
                allowNull:false,
                unique:true                
            }            
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Main',
            tableName:'mains',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
 
   
}